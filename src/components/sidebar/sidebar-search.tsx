'use client'

import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { startTransition, useActionState, useRef, useState } from 'react'

import { searchPromptAction } from '@/app/actions/prompt.action'
import type { PromptSummary } from '@/core/domain/prompts/prompt.entity'
import { cn } from '@/lib/utils'

import { Label } from '../ui/label'
import { SidebarGroup, SidebarGroupContent, SidebarInput, useSidebar } from '../ui/sidebar'

type SidebarSearchProps = {
  prompts: PromptSummary[]
}

export function SidebarSearch({ prompts }: SidebarSearchProps) {
  const router = useRouter()
  const params = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)

  const { open } = useSidebar()

  const [searchState, formAction, isPending] = useActionState(searchPromptAction, { success: true, prompts })
  const [query, setQuery] = useState(params.get('q') || '')

  const promptsList = query.trim() ? searchState.prompts : prompts

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)

    startTransition(() => {
      const url = value ? `/?q=${encodeURIComponent(value)}` : '/'
      router.push(url, { scroll: false })
      formRef.current?.requestSubmit()
    })
  }

  return (
    <form ref={formRef} action={formAction} className={cn(!open && 'hidden')}>
      <SidebarGroup className="p-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search Prompts"
            className="pl-8"
            value={query}
            onChange={handleSearchChange}
          />
          <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
