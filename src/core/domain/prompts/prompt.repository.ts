import type { CreatePromptDTO } from '@/core/application/prompts/create-prompt.dto'
import type { UpdatePromptDTO } from '@/core/application/prompts/update-prompt.dto'

import { Prompt } from './prompt.entity'

export interface PromptRepository {
  create(data: CreatePromptDTO): Promise<Prompt>
  update(data: UpdatePromptDTO): Promise<Prompt | null>
  findMany(): Promise<Prompt[]>
  findById(id: string): Promise<Prompt | null>
  findByTitle(title: string): Promise<Prompt | null>
  searchMany(term: string): Promise<Prompt[]>
}
