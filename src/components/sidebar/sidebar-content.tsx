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
          {prompts.map(({ id, title }) => (
            <SidebarMenuItem key={id}>
              <SidebarMenuButton asChild>
                <Link href={`/prompts/${id}`} className="truncate">
                  {title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  )
}
