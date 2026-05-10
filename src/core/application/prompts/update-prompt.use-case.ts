import type { PromptRepository } from '../../domain/prompts/prompt.repository'
import type { UpdatePromptDTO } from './update-prompt.dto'

export class UpdatePromptUseCase {
  constructor(private promptRepository: PromptRepository) {}

  async execute(data: UpdatePromptDTO) {
    const prompt = await this.promptRepository.findById(data.id)

    if (!prompt) throw new Error('PROMPT_NOT_FOUND')

    await this.promptRepository.update(data)
  }
}
