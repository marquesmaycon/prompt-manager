import { CommandIcon, PlusCircleIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { prisma } from '@/lib/prisma'

import { ThemeSwitcher } from '../theme-switcher'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'
import { AppSidebarContent } from './sidebar-content'
import { SidebarSearch } from './sidebar-search'

export async function AppSidebar() {
  const prompts = await prisma.prompt.findMany()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center">
                  <CommandIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Prompt Manager</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarSearch prompts={prompts} />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="New Prompt">
              <Link
                href="/prompts/new"
                className="bg-primary text-primary-foreground transition-colors"
                aria-label="New Prompt"
              >
                <PlusCircleIcon />
                <span>New Prompt</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <AppSidebarContent prompts={prompts} />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Theme Switcher">
              <ThemeSwitcher />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
