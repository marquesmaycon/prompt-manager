import Link from 'next/link'

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'

type Prompt = {
  id: string
  title: string
  content: string
}

export type AppSidebarContentProps = {
  prompts: Prompt[]
}

export function AppSidebarContent({ prompts }: AppSidebarContentProps) {
  return (
    <SidebarContent>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Prompts</SidebarGroupLabel>
        <SidebarMenu>
          {prompts.map((prompt) => (
            <SidebarMenuItem key={prompt.id}>
              <SidebarMenuButton asChild>
                <Link href={`/prompts/${prompt.id}`}>{prompt.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  )
}
