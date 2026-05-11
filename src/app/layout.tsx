import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google'

import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

import Providers from './providers'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Prompt Manager',
  description: 'Manage your AI prompts efficiently',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        'font-mono',
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <AppSidebar />
          <SidebarInset>
            <SidebarTrigger />
            <section className="flex h-screen px-4">
              <main className="relative min-w-0 flex-1 overflow-auto">
                <div className="mx-auto h-full max-w-full p-4 sm:p-6 md:max-w-3xl md:p-8">{children}</div>
              </main>
            </section>
          </SidebarInset>
        </Providers>
      </body>
    </html>
  )
}
