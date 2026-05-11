'use client'

import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/react'
import React from 'react'
import { Toaster } from 'sonner'

import { SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster position="top-right" />
        </TooltipProvider>
      </ThemeProvider>
    </NuqsAdapter>
  )
}
