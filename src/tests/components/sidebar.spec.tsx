import userEvent from '@testing-library/user-event'

import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { render, screen } from '@/lib/test-utils'

const pushMock = jest.fn()
let mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => mockSearchParams,
}))
jest.mock('@/lib/prisma', () => ({
  prisma: {
    prompt: {
      findMany: jest.fn().mockResolvedValue(getPrompts()),
    },
  },
}))

function getPrompts() {
  return [
    { id: '1', title: 'Prompt 1', content: 'Content 1' },
    { id: '2', title: 'Prompt 2', content: 'Content 2' },
    { id: '3', title: 'Prompt 3', content: 'Content 3' },
  ]
}

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <TooltipProvider>
      <SidebarProvider>
        {component}
        <SidebarTrigger />
      </SidebarProvider>
    </TooltipProvider>
  )
}

const makeSut = async () => {
  const appSidebar = await AppSidebar()
  return renderWithProviders(appSidebar)
}

describe('Sidebar', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    mockSearchParams = new URLSearchParams()
  })

  describe('Header', () => {
    it('should render a new prompt button and have the correct href attribute', async () => {
      await makeSut()

      const button = await screen.findByRole('link', { name: /New Prompt/i })

      expect(button).toBeVisible()
      expect(button).toHaveAttribute('href', '/prompts/new')
    })
  })

  describe('Search', () => {
    it('should update the search input while typing', async () => {
      await makeSut()
      const searchInput = await screen.findByPlaceholderText(/Search Prompts/i)

      await user.type(searchInput, 'AI')

      expect(searchInput).toHaveValue('AI')
    })

    it('should send the user to the search page with modified URL', async () => {
      await makeSut()

      const text = 'AI Prompts'
      const searchInput = await screen.findByPlaceholderText(/Search Prompts/i)

      await user.type(searchInput, text)
      expect(pushMock).toHaveBeenLastCalledWith(`/?q=${encodeURIComponent(text)}`)

      await user.clear(searchInput)
      expect(pushMock).toHaveBeenLastCalledWith('/')
    })

    it('should initialize the search input with the query parameter from the URL', async () => {
      const text = 'Test Query'
      const params = new URLSearchParams({ q: text })
      mockSearchParams = params

      await makeSut()

      const searchInput = await screen.findByPlaceholderText(/Search Prompts/i)
      expect(searchInput).toHaveValue(text)
    })

    it('deveria submeter o form ao digitar no campo de busca', async () => {
      const submitSpy = jest
        .spyOn(HTMLFormElement.prototype, 'requestSubmit')
        .mockImplementation(() => undefined)
      await makeSut()

      const searchInput = await screen.findByPlaceholderText('Search Prompts')

      await user.type(searchInput, 'AI')

      expect(submitSpy).toHaveBeenCalled()
      submitSpy.mockRestore()
    })

    it('deveria submeter automaticamente ao montar quando houver query', async () => {
      const submitSpy = jest
        .spyOn(HTMLFormElement.prototype, 'requestSubmit')
        .mockImplementation(() => undefined)
      const text = 'text'
      const searchParams = new URLSearchParams(`q=${text}`)
      mockSearchParams = searchParams
      await makeSut()

      expect(submitSpy).toHaveBeenCalled()
      submitSpy.mockRestore()
    })
  })

  describe('Collapse Button', () => {
    it('should show the toggle button when collapsed', async () => {
      await makeSut()

      const toggleButton = await screen.findByRole('button', { name: /Toggle Sidebar/i })

      await user.click(toggleButton)

      expect(toggleButton).toBeVisible()
    })

    it('should collapse and expand the sidebar when the toggle button is clicked', async () => {
      const { container } = await makeSut()

      const toggleButton = await screen.findByRole('button', { name: /Toggle Sidebar/i })

      await user.click(toggleButton)
      expect(container.querySelector('[data-state="collapsed"]')).toBeInTheDocument()

      await user.click(toggleButton)
      expect(container.querySelector('[data-state="expanded"]')).toBeInTheDocument()
    })

    it('deveria reexpandir ao clicar no botão de expandir', async () => {
      await makeSut()
      const collapseButton = await screen.findByRole('button', {
        name: /Toggle Sidebar/i,
      })
      await user.click(collapseButton)
      await user.click(collapseButton)

      expect(await screen.findByRole('button', { name: /Toggle Sidebar/i })).toBeVisible()
      expect(await screen.findByRole('navigation', { name: 'Prompts list' })).toBeVisible()
    })
  })

  describe('Content', () => {
    it('should render the prompts list', async () => {
      const { container } = await makeSut()

      expect(container.querySelectorAll('[aria-label="Prompts list"] a')).toHaveLength(getPrompts().length)
    })
  })
})
