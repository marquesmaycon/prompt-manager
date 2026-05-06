import { prisma } from '@/lib/prisma'

import { Sidebar } from '../ui/sidebar'
import { AppSidebarContent } from './sidebar-content'

export async function AppSidebar() {
  const prompts = await prisma.prompt.findMany()

  return (
    <Sidebar>
      <AppSidebarContent prompts={prompts} />
    </Sidebar>
  )
}
