import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'

import { CopyButton, type CopyButtonProps } from '@/components/button-actions'
import { act, render, screen, waitFor } from '@/lib/test-utils'

jest.mock('sonner', () => ({ toast: { error: jest.fn() } }))
const writeTextMock = jest.fn()

const makeSut = async ({ content = '' }: CopyButtonProps) => {
  render(<CopyButton content={content} />)

  const copyButton = screen.getByRole('button', { name: /Copy/i })
  const findCopiedButton = async () => await screen.findByRole('button', { name: /Copied/i })

  return { copyButton, findCopiedButton }
}

describe('CopyButton', () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

  beforeEach(() => {
    writeTextMock.mockReset()
    Object.defineProperty(global.navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
    })
    jest.useFakeTimers({ legacyFakeTimers: true })
  })

  it('deve desabilitar o botão quando o conteúdo estiver vazio', async () => {
    const content = '    '
    const { copyButton } = await makeSut({ content })

    expect(copyButton).toBeDisabled()
    await user.click(copyButton)

    expect(writeTextMock).not.toHaveBeenCalled()
  })

  it(`deve copiar e alterar o label para "Copiado" e voltar para "Copiar"`, async () => {
    writeTextMock.mockResolvedValueOnce(undefined)
    const content = 'text'
    const { copyButton, findCopiedButton } = await makeSut({ content })

    await user.click(copyButton)

    expect(await findCopiedButton()).toBeInTheDocument()

    act(() => jest.advanceTimersByTime(2000))

    expect(copyButton).toBeInTheDocument()
  })

  it('deve limpar o timer anterior antes de copiar novamente', async () => {
    writeTextMock.mockResolvedValueOnce(undefined)
    const clearSpy = jest.spyOn(window, 'clearTimeout')
    const content = 'text'
    const { copyButton, findCopiedButton } = await makeSut({ content })

    await user.click(copyButton)

    const copiedButton = await findCopiedButton()
    expect(copiedButton).toBeInTheDocument()

    await user.click(copiedButton)

    expect(clearSpy).toHaveBeenCalled()
    clearSpy.mockRestore()
  })

  it('deve exibir um toast de erro quando o copiar falhar', async () => {
    const errorMessage = 'falha ao copiar'
    const error = new Error(errorMessage)
    jest.spyOn(global.navigator.clipboard, 'writeText').mockRejectedValueOnce(error)
    const content = 'text'
    const { copyButton } = await makeSut({ content })

    await user.click(copyButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(`Erro ao copiar o texto: ${errorMessage}`)
    })
    expect(copyButton).toBeVisible()
  })
})
