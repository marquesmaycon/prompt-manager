import type { CreatePromptDTO } from '@/core/application/prompts/create-prompt.dto'
import type { UpdatePromptDTO } from '@/core/application/prompts/update-prompt.dto'
import { Prompt } from '@/core/domain/prompts/prompt.entity'
import { PromptRepository } from '@/core/domain/prompts/prompt.repository'
import { PrismaClient } from '@/generated/prisma/client'

export class PrismaPromptRepository implements PromptRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreatePromptDTO): Promise<Prompt> {
    return await this.prisma.prompt.create({ data })
  }

  async update(payload: UpdatePromptDTO): Promise<Prompt | null> {
    const { id, ...data } = payload
    return await this.prisma.prompt.update({ where: { id }, data })
  }

  async findById(id: string): Promise<Prompt | null> {
    return await this.prisma.prompt.findUnique({ where: { id } })
  }

  async findMany(): Promise<Prompt[]> {
    return await this.prisma.prompt.findMany({ orderBy: { createdAt: 'desc' } })
  }

  async searchMany(term?: string): Promise<Prompt[]> {
    const normalizedTerm = term?.trim()
    return await this.prisma.prompt.findMany({
      where: normalizedTerm
        ? {
            OR: [
              { title: { contains: normalizedTerm, mode: 'insensitive' } },
              { content: { contains: normalizedTerm, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    })
  }

  async findByTitle(title: string): Promise<Prompt | null> {
    return await this.prisma.prompt.findFirst({ where: { title } })
  }

  async delete(id: string) {
    await this.prisma.prompt.delete({ where: { id } })
  }
}
