import type { CreatePromptDTO } from '@/core/application/prompts/create-prompt.dto'
import { Prompt, type PromptSummary } from '@/core/domain/prompts/prompt.entity'
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPromptRepository } from '@/infra/repository/prisma-prompt.repository'

type PromptDelegateMock = {
  create: jest.MockedFunction<(args: { data: CreatePromptDTO }) => Prompt>
  findFirst: jest.MockedFunction<(args: { where: { title: string } }) => Promise<PromptSummary>>
  findMany: jest.MockedFunction<
    (args: {
      orderBy?: { createdAt: 'asc' | 'desc' }
      where?: {
        OR: Array<{
          title?: { contains: string; mode: 'insensitive' }
          content?: { contains: string; mode: 'insensitive' }
        }>
      }
    }) => Promise<Prompt[]>
  >
}

type PrismaMock = {
  prompt: PromptDelegateMock
}

function createMockPrisma() {
  const mock: PrismaMock = {
    prompt: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  }

  return mock as unknown as PrismaClient & PrismaMock
}

describe('PrismaPromptRepository', () => {
  let prisma: ReturnType<typeof createMockPrisma>
  let repository: PrismaPromptRepository

  beforeEach(() => {
    prisma = createMockPrisma()
    repository = new PrismaPromptRepository(prisma)
  })

  describe('create', () => {
    it('should call created methos with proper data', async () => {
      const data = { title: 'title', content: 'content' }

      await repository.create(data)

      expect(prisma.prompt.create).toHaveBeenCalledWith({ data })
    })
  })

  describe('findByTitle', () => {
    it('should call findByTitle with the proper title', async () => {
      const input = { id: '1', title: 'Title 01', content: 'c' }
      prisma.prompt.findFirst.mockResolvedValue(input)

      const result = await repository.findByTitle(input.title)

      expect(prisma.prompt.findFirst).toHaveBeenCalledWith({ where: { title: input.title } })
      expect(result).toBe(input)
    })
  })

  describe('findMany', () => {
    it('deve ordenar por createdAt desc e mapear os resultados', async () => {
      const now = new Date()
      const input = [
        {
          id: '1',
          title: 'Title 01',
          content: 'Content 01',
          createdAt: now,
          updatedAt: now,
        },
        {
          id: '2',
          title: 'Title 02',
          content: 'Content 02',
          createdAt: now,
          updatedAt: now,
        },
      ]
      prisma.prompt.findMany.mockResolvedValue(input)

      const results = await repository.findMany()

      expect(prisma.prompt.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      })
      expect(results).toMatchObject(input)
    })
  })

  describe('searchMany', () => {
    it('deve buscar por termo vazio e não enviar o where', async () => {
      const now = new Date()
      const input = [
        {
          id: '1',
          title: 'Title 01',
          content: 'Content 01',
          createdAt: now,
          updatedAt: now,
        },
      ]
      prisma.prompt.findMany.mockResolvedValue(input)

      const results = await repository.searchMany('    ')

      expect(prisma.prompt.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: { createdAt: 'desc' },
      })
      expect(results).toMatchObject(input)
    })

    it('deve aceitar termo undefined e não enviar o where', async () => {
      const now = new Date()
      const input = [
        {
          id: '1',
          title: 'Title 01',
          content: 'Content 01',
          createdAt: now,
          updatedAt: now,
        },
      ]
      prisma.prompt.findMany.mockResolvedValue(input)

      const results = await repository.searchMany(undefined)

      expect(prisma.prompt.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: { createdAt: 'desc' },
      })
      expect(results).toMatchObject(input)
    })

    it('deve buscar por termo e popular OR no where', async () => {
      const now = new Date()
      const input = [
        {
          id: '1',
          title: 'Title 01',
          content: 'Content 01',
          createdAt: now,
          updatedAt: now,
        },
      ]
      prisma.prompt.findMany.mockResolvedValue(input)

      const results = await repository.searchMany('  title 01  ')

      expect(prisma.prompt.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { title: { contains: 'title 01', mode: 'insensitive' } },
            { content: { contains: 'title 01', mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      })
      expect(results).toMatchObject(input)
    })
  })
})
