import userEvent from '@testing-library/user-event'

import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { render, screen } from '@/lib/test-utils'

const makeSut = async () => {
  const appSidebar = await AppSidebar()
  return render(
    <TooltipProvider>
      <SidebarProvider>
        {appSidebar}
        <SidebarTrigger />
      </SidebarProvider>
    </TooltipProvider>
  )
}

describe('Sidebar', () => {
  const user = userEvent.setup()

  it('should render a new prompt button', async () => {
    await makeSut()
    expect(screen.getByRole('link', { name: /New Prompt/i })).toBeVisible()
  })

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

  it('should have the correct href attribute for the new prompt button', async () => {
    await makeSut()

    const newPromptButton = screen.getByRole('link', { name: /New Prompt/i })

    expect(newPromptButton).toHaveAttribute('href', '/prompts/new')
  })
})
