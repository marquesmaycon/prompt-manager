import { Suspense } from 'react'

import { PrismaPromptRepository } from '@/infra/repository/prisma-prompt.repository'
import { prisma } from '@/lib/prisma'

import { Sidebar } from '../ui/sidebar'
import { Spinner } from '../ui/spinner'
import { AppSidebarContent } from './sidebar-content'

export async function AppSidebar() {
  const repo = new PrismaPromptRepository(prisma)
  const initialPrompts = await repo.findMany().catch(() => [])

  return (
    <Sidebar>
      <Suspense fallback={<Spinner />}>
        <AppSidebarContent prompts={initialPrompts} />
      </Suspense>
    </Sidebar>
  )
}
