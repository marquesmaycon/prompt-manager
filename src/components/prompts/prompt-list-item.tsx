import { SpinnerIcon } from '@phosphor-icons/react'
import { TrashIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { deletePromptAction } from '@/app/actions/prompt.actions'
import type { PromptSummary } from '@/core/domain/prompts/prompt.entity'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { SidebarMenuItem } from '../ui/sidebar'

export type PromptListItemProps = {
  prompt: PromptSummary
}

export function PromptListItem({ prompt: { id, title, content } }: PromptListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    const res = await deletePromptAction(id)

    const toastFn = res.success ? toast.success : toast.error
    toastFn(res.message)

    setIsDeleting(false)
  }

  return (
    <SidebarMenuItem className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex gap-2 border-b p-4 text-sm last:border-b-0">
      <Link href={`/${id}`}>
        <span className="line-clamp-2 font-bold">{title}</span>
        <span className="text-muted-foreground line-clamp-2 w-65 text-xs whitespace-break-spaces">
          {content}
        </span>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="ml-auto"
            size="icon-xs"
            variant="destructive"
            title="Delete Prompt"
            aria-label="Delete Prompt"
          >
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Prompt</AlertDialogTitle>
            <AlertDialogDescription>Are you sure? This action is irreversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {!!isDeleting && <SpinnerIcon className="animate-spin" />}
              Delete Forever
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarMenuItem>
  )
}
