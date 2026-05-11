import userEvent from '@testing-library/user-event'
import { mocked } from 'jest-mock'
import { toast } from 'sonner'

import { deletePromptAction } from '@/app/actions/prompt.actions'
import { PromptListItem, type PromptListItemProps } from '@/components/prompts/prompt-list-item'
import { render, screen } from '@/lib/test-utils'

const refreshMock = jest.fn()

jest.mock('next/navigation', () => ({ useRouter: () => ({ refresh: refreshMock }) }))
jest.mock('sonner', () => ({ toast: { success: jest.fn(), error: jest.fn() } }))
jest.mock('@/app/actions/prompt.actions', () => ({ deletePromptAction: jest.fn() }))

const toastMock = mocked(toast)
const deletePromptActionMock = mocked(deletePromptAction)

const makeSut = ({ prompt }: PromptListItemProps) => {
  render(<PromptListItem prompt={prompt} />)

  const deleteButton = screen.getByRole('button', { name: /delete prompt/i })
  const confirmButton = () => screen.getByRole('button', { name: /delete forever/i })

  return { deleteButton, confirmButton }
}

describe('PromptCard', () => {
  const user = userEvent.setup()
  const prompt = { id: '1', title: 'title 01', content: 'content 01' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deveria renderizar o link com href corretamente', () => {
    makeSut({ prompt })
    const link = screen.getByRole('link')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', `/${prompt.id}`)
  })

  it('deveria abrir o dialog de remoção de um prompt', async () => {
    const { deleteButton, confirmButton } = makeSut({ prompt })

    await user.click(deleteButton)

    expect(confirmButton()).toBeInTheDocument()
  })

  it('deveria remover com sucesso e exibir o toast', async () => {
    const errorMessage = 'Prompt deleted'
    deletePromptActionMock.mockResolvedValue({ success: true, message: errorMessage })
    const { confirmButton, deleteButton } = makeSut({ prompt })

    await user.click(deleteButton)
    await user.click(confirmButton())

    expect(toastMock.success).toHaveBeenCalledWith(errorMessage)
    expect(refreshMock).toHaveBeenCalledTimes(1)
  })

  it('deveria exibir erro quando a action falhar', async () => {
    const errorMessage = 'Erro ao remover prompt'
    deletePromptActionMock.mockResolvedValue({ success: false, message: errorMessage })

    const { confirmButton, deleteButton } = makeSut({ prompt })

    await user.click(deleteButton)
    await user.click(confirmButton())

    expect(toastMock.error).toHaveBeenCalledWith(errorMessage)
    expect(refreshMock).not.toHaveBeenCalled()
  })
})
