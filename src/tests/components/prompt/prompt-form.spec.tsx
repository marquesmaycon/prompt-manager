import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'

import { PromptForm } from '@/components/prompts/prompt-form'
import { render, screen } from '@/lib/test-utils'

const refreshMock = jest.fn()
const createActionMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: refreshMock }),
}))
jest.mock('@/app/actions/prompt.actions', () => ({
  createPromptAction: (...args: unknown[]) => createActionMock(...args),
}))
jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}))

const makeSut = () => {
  return render(<PromptForm />)
}

describe('PromptForm', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    createActionMock.mockReset()
    refreshMock.mockReset()
    ;(toast.success as jest.Mock).mockReset()
    ;(toast.error as jest.Mock).mockReset()
  })

  it('should create successfully a new prompt ', async () => {
    createActionMock.mockResolvedValueOnce({ success: true, message: 'Prompt successfully created.' })
    makeSut()

    const title = screen.getByLabelText('Title')
    const content = screen.getByLabelText('Content')

    const data = { title: 'Title 1', content: 'Content 1' }
    await user.type(title, data.title)
    await user.type(content, data.content)

    const submitButton = screen.getByRole('button', { name: /save/i })

    await user.click(submitButton)

    expect(createActionMock).toHaveBeenCalledWith(data)
    expect(toast.success).toHaveBeenCalledWith('Prompt successfully created.')
    expect(refreshMock).toHaveBeenCalledTimes(1)
  })

  it('should throw an error when create action fails', async () => {
    const errorMessage = 'error'
    createActionMock.mockResolvedValueOnce({ success: false, message: errorMessage })
    makeSut()

    const title = screen.getByLabelText('Title')
    const content = screen.getByLabelText('Content')

    const data = { title: 'Title 1', content: 'Content 1' }
    await user.type(title, data.title)
    await user.type(content, data.content)

    const submitButton = screen.getByRole('button', { name: /save/i })

    await user.click(submitButton)

    expect(toast.error).toHaveBeenCalledWith(errorMessage)
    expect(refreshMock).not.toHaveBeenCalled()
  })
})
