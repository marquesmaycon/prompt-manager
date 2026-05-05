'use client'

import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { startTransition, useState } from 'react'

import { Label } from '../ui/label'
import { SidebarGroup, SidebarGroupContent, SidebarInput } from '../ui/sidebar'

export function SidebarSearch() {
  const router = useRouter()
  const params = useSearchParams()

  const [query, setQuery] = useState(params.get('q') || '')

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)

    startTransition(() => {
      const url = value ? `/?q=${encodeURIComponent(value)}` : '/'
      router.push(url)
    })
  }

  return (
    <form action="">
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
