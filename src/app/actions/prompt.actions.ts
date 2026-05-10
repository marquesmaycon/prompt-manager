'use server'

import z from 'zod'

import { type CreatePromptDTO, createPromptSchema } from '@/core/application/prompts/create-prompt.dto'
import { CreatePromptUseCase } from '@/core/application/prompts/create-prompt.use-case'
import { SearchPromptsUseCase } from '@/core/application/prompts/search-prompts.use-case'
import { type UpdatePromptDTO, updatePromptSchema } from '@/core/application/prompts/update-prompt.dto'
import { UpdatePromptUseCase } from '@/core/application/prompts/update-prompt.use-case'
import type { PromptSummary } from '@/core/domain/prompts/prompt.entity'
import { PrismaPromptRepository } from '@/infra/repository/prisma-prompt.repository'
import { prisma } from '@/lib/prisma'

type FormState = {
  success: boolean
  message?: string
  errors?: unknown
}

type SearchFormState = FormState & {
  prompts?: PromptSummary[]
}

export async function createPromptAction(data: CreatePromptDTO): Promise<FormState> {
  const validated = createPromptSchema.safeParse(data)

  if (!validated.success) {
    return { success: false, message: 'Erro de validação', errors: z.treeifyError(validated.error) }
  }

  try {
    const repository = new PrismaPromptRepository(prisma)
    const useCase = new CreatePromptUseCase(repository)

    await useCase.execute(validated.data)
  } catch (err) {
    if ((err as Error).message === 'PROMPT_ALREADY_EXISTS') {
      return { success: false, message: 'Prompt already exists.' }
    }
    return { success: false, message: 'Failed to create new prompt.' }
  }
  return { success: true, message: 'Prompt successfully created.' }
}

export async function updatePromptAction(data: UpdatePromptDTO): Promise<FormState> {
  const validated = updatePromptSchema.safeParse(data)

  if (!validated.success) {
    return { success: false, message: 'Erro de validação', errors: z.treeifyError(validated.error) }
  }

  try {
    const repository = new PrismaPromptRepository(prisma)
    const useCase = new UpdatePromptUseCase(repository)

    await useCase.execute(validated.data)
  } catch (err) {
    if ((err as Error).message === 'NOT_FOUND') {
      return { success: false, message: 'Prompt not found.' }
    }
    return { success: false, message: 'Failed to update prompt.' }
  }
  return { success: true, message: 'Prompt successfully updated.' }
}

export async function searchPromptAction(_: SearchFormState, formData: FormData): Promise<SearchFormState> {
  const term = String(formData.get('q') ?? '').trim()

  const repository = new PrismaPromptRepository(prisma)
  const useCase = new SearchPromptsUseCase(repository)

  try {
    const results = await useCase.execute(term)

    const prompts = results.map(({ id, title, content }) => ({
      id,
      title,
      content,
    }))

    return { success: true, prompts }
  } catch {
    return { success: false, message: 'Falha ao buscar prompts.' }
  }
}
