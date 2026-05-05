import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '../ui/sidebar'

export function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Prompts</SidebarGroupLabel>
        <SidebarMenu></SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  )
}
