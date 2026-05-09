import { PrismaPromptRepository } from '@/infra/repository/prisma-prompt.repository'
import { prisma } from '@/lib/prisma'

import { Sidebar } from '../ui/sidebar'
import { AppSidebarContent } from './sidebar-content'

export async function AppSidebar() {
  const repo = new PrismaPromptRepository(prisma)
  const initialPrompts = await repo.findMany().catch(() => [])

  return (
    <Sidebar>
      <AppSidebarContent prompts={initialPrompts} />
    </Sidebar>
  )
}
