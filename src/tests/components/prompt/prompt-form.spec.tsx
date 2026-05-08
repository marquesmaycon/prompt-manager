import userEvent from '@testing-library/user-event'
import { mocked } from 'jest-mock'
import { toast } from 'sonner'

import { createPromptAction } from '@/app/actions/prompt.actions'
import { PromptForm } from '@/components/prompts/prompt-form'
import { render, screen } from '@/lib/test-utils'

const refreshMock = jest.fn()

jest.mock('next/navigation', () => ({ useRouter: () => ({ refresh: refreshMock }) }))
jest.mock('@/app/actions/prompt.actions', () => ({ createPromptAction: jest.fn() }))
jest.mock('sonner', () => ({ toast: { success: jest.fn(), error: jest.fn() } }))

const mockedCreatePromptAction = mocked(createPromptAction)
const mockedToastSuccess = mocked(toast.success)
const mockedToastError = mocked(toast.error)

const setup = async () => {
  const user = userEvent.setup()

  render(<PromptForm />)

  const title = screen.getByLabelText(/title/i)
  const content = screen.getByLabelText(/content/i)
  const submit = screen.getByRole('button', { name: /save/i })

  const payload = { title: 'Title 1', content: 'Content 1' }

  const fillForm = async () => {
    await user.type(screen.getByLabelText(/title/i), payload.title)
    await user.type(screen.getByLabelText(/content/i), payload.content)
  }

  const submitForm = async () => {
    await user.click(screen.getByRole('button', { name: /save/i }))
  }

  return { user, payload, title, content, submit, fillForm, submitForm }
}

describe('PromptForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create successfully a new prompt', async () => {
    const successMsg = 'Prompt successfully created.'
    mockedCreatePromptAction.mockResolvedValueOnce({ success: true, message: successMsg })

    const { payload, fillForm, submitForm } = await setup()

    await fillForm()
    await submitForm()

    expect(mockedCreatePromptAction).toHaveBeenCalledWith(payload)
    expect(mockedToastSuccess).toHaveBeenCalledWith(successMsg)
    expect(refreshMock).toHaveBeenCalledTimes(1)
  })

  it('should show error toast when create action fails', async () => {
    const errorMsg = 'error'
    mockedCreatePromptAction.mockResolvedValueOnce({ success: false, message: errorMsg })

    const { fillForm, submitForm } = await setup()

    await fillForm()
    await submitForm()

    expect(mockedToastError).toHaveBeenCalledWith(errorMsg)
    expect(refreshMock).not.toHaveBeenCalled()
  })
})
