import { TrashIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import type { PromptSummary } from '@/core/domain/prompts/prompt.entity'

import { Button } from '../ui/button'
import { SidebarMenuItem } from '../ui/sidebar'

type PromptListItemProps = {
  prompt: PromptSummary
}

export function PromptListItem({ prompt: { id, title, content } }: PromptListItemProps) {
  return (
    <SidebarMenuItem className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex gap-2 border-b p-4 text-sm last:border-b-0">
      <Link href={`/prompts/${id}`}>
        <span className="line-clamp-2 font-bold">{title}</span>
        <span className="text-muted-foreground line-clamp-2 w-65 text-xs whitespace-break-spaces">
          {content}
        </span>
      </Link>
      <Button className="ml-auto" size="icon-xs" variant="destructive">
        <TrashIcon />
      </Button>
    </SidebarMenuItem>
  )
}
