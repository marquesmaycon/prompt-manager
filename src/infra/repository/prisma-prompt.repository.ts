import { Prompt } from '@/core/domain/prompts/prompt.entity'
import { PromptRepository } from '@/core/domain/prompts/prompt.repository'
import { PrismaClient } from '@/generated/prisma/client'

export class PrismaPromptRepository implements PromptRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<Prompt[]> {
    return await this.prisma.prompt.findMany({ orderBy: { createdAt: 'desc' } })
  }

  async searchMany(term: string): Promise<Prompt[]> {
    return await this.prisma.prompt.findMany({
      where: term
        ? {
            OR: [
              { title: { contains: term, mode: 'insensitive' } },
              { content: { contains: term, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    })
  }
}
