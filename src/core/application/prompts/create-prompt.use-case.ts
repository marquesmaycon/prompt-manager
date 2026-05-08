import type { PromptRepository } from '../../domain/prompts/prompt.repository'
import type { CreatePromptDTO } from './create-prompt.dto'

export class CreatePromptUseCase {
  constructor(private promptRepository: PromptRepository) {}

  async execute(data: CreatePromptDTO) {
    const exists = await this.promptRepository.findByTitle(data.title)

    if (exists) throw new Error('PROMPT_ALREADY_EXISTS')

    return await this.promptRepository.create(data)
  }
}
