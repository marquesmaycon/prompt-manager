'use client'

import { CommandIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { startTransition, useActionState, useEffect, useRef, useState } from 'react'

import { searchPromptAction } from '@/app/actions/prompt.actions'
import type { PromptSummary } from '@/core/domain/prompts/prompt.entity'
import { cn } from '@/lib/utils'

import { PromptListItem } from '../prompts/prompt-list-item'
import { ThemeSwitcher } from '../theme-switcher'
import { Label } from '../ui/label'
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar'
import { Spinner } from '../ui/spinner'

export type AppSidebarContentProps = {
  prompts: PromptSummary[]
}

export function AppSidebarContent({ prompts }: AppSidebarContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)

  const { open } = useSidebar()

  const [searchState, action, isPending] = useActionState(searchPromptAction, { success: true, prompts })
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  const hasQuery = query.trim().length > 0

  useEffect(() => {
    if (!hasQuery) return
    formRef.current?.requestSubmit()
  }, [hasQuery])

  const promptsList = hasQuery ? (searchState.prompts ?? prompts) : prompts

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)

    startTransition(() => {
      const url = value ? `/?q=${encodeURIComponent(value)}` : '/'
      router.push(url)
      formRef.current?.requestSubmit()
    })
  }
  return (
    <>
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

        <form ref={formRef} action={action} className={cn(!open && 'hidden')}>
          <SidebarGroup className="p-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="search"
                name="q"
                placeholder="Search Prompts"
                className="pl-8"
                value={query}
                onChange={handleSearchChange}
              />
              {isPending && (
                <Spinner className="absolute top-1/2 right-2 -translate-y-1/2 opacity-50 select-none" />
              )}
              <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="New Prompt">
              <Link
                href="/new"
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

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Prompts</SidebarGroupLabel>
          <SidebarGroupContent>
            <nav aria-label="Prompts list">
              <SidebarMenu>
                {promptsList?.map((p) => (
                  <PromptListItem key={p.id} prompt={p} />
                ))}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Theme Switcher">
              <ThemeSwitcher />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
