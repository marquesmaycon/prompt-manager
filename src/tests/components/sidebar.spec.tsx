import userEvent from '@testing-library/user-event'

import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { AppSidebarContent, type AppSidebarContentProps } from '@/components/sidebar/sidebar-content'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { render, screen } from '@/lib/test-utils'

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

const makeSutContent = (prompts: AppSidebarContentProps['prompts']) => {
  const appSidebarContent = AppSidebarContent({ prompts })
  return renderWithProviders(appSidebarContent)
}

const prompts = [
  { id: '1', title: 'Prompt 1', content: 'Content 1' },
  { id: '2', title: 'Prompt 2', content: 'Content 2' },
]

describe('Sidebar', () => {
  const user = userEvent.setup()

  it('should render a new prompt button and have the correct href attribute', async () => {
    await makeSut()

    const button = screen.getByRole('link', { name: /New Prompt/i })

    expect(button).toBeVisible()
    expect(button).toHaveAttribute('href', '/prompts/new')
  })

  describe('Collapse Button', () => {
    it('should init expanded and show the collapse button', async () => {
      await makeSut()
      expect(screen.getByRole('button', { name: /Toggle Sidebar/i })).toBeVisible()
    })

    it('should collapse and expand the sidebar when the toggle button is clicked', async () => {
      const { container } = await makeSut()

      const toggleButton = screen.getByRole('button', { name: /Toggle Sidebar/i })

      await user.click(toggleButton)
      expect(container.querySelector('[data-state="collapsed"]')).toBeInTheDocument()

      await user.click(toggleButton)
      expect(container.querySelector('[data-state="expanded"]')).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should render the prompts list', () => {
      const { container } = makeSutContent(prompts)
      expect(container.querySelectorAll('a')).toHaveLength(prompts.length)
    })
  })
})
