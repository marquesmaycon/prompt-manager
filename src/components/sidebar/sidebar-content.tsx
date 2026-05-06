import type { PromptSummary } from '@/core/domain/prompts/prompt.entity'

import { PromptListItem } from '../prompts/prompt-list-item'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '../ui/sidebar'

export type AppSidebarContentProps = {
  prompts: PromptSummary[]
}

export function AppSidebarContent({ prompts }: AppSidebarContentProps) {
  return (
    <SidebarContent>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Prompts</SidebarGroupLabel>
        <SidebarGroupContent>
          <nav aria-label="Prompts list">
            <SidebarMenu>
              {prompts.map((p) => (
                <PromptListItem key={p.id} prompt={p} />
              ))}
            </SidebarMenu>
          </nav>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
