import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Prompt Manager',
  description: 'Manage your AI prompts efficiently',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <section className="flex h-screen">
            <main className="relative min-w-0 flex-1 overflow-auto">
              <div className="mx-auto h-full max-w-full p-4 sm:p-6 md:max-w-3xl md:p-8">
                {children}
              </div>
            </main>
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
