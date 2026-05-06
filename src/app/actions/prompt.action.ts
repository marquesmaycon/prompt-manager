'use server'

import type { PromptSummary } from '@/core/domain/prompts/prompt.entity'
import { prisma } from '@/lib/prisma'

type SearchFormState = {
  success: boolean
  prompts?: PromptSummary[]
  message?: string
}

export async function searchPromptAction(_: SearchFormState, formData: FormData): Promise<SearchFormState> {
  const query = String(formData.get('q')).trim()

  try {
    const prompts = await prisma.prompt.findMany({
      where: query
        ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    })

    const summaries = prompts.map(({ id, title, content }) => ({
      id,
      title,
      content,
    }))

    return { success: true, prompts: summaries }
  } catch (error) {
    console.error('Error searching prompts:', error)
    return { success: false, message: 'An error occurred while searching for prompts.' }
  }
}
