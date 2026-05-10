'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { createPromptAction, updatePromptAction } from '@/app/actions/prompt.actions'
import { type CreatePromptDTO, createPromptSchema } from '@/core/application/prompts/create-prompt.dto'
import type { Prompt } from '@/generated/prisma'

import { CopyButton } from '../button-actions'
import { Button } from '../ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type PromptFormProps = {
  prompt?: Prompt | null
}

export const PromptForm = ({ prompt }: PromptFormProps) => {
  const router = useRouter()

  const { control, reset, handleSubmit } = useForm<CreatePromptDTO>({
    resolver: zodResolver(createPromptSchema),
    defaultValues: { title: prompt?.title || '', content: prompt?.content || '' },
  })

  const content = useWatch({ control, name: 'content' })

  const isEdit = !!prompt?.id

  const submit = async (data: CreatePromptDTO) => {
    const result = isEdit
      ? await updatePromptAction({ id: prompt.id, ...data })
      : await createPromptAction(data)

    if (!result.success) {
      toast.error(result.message)
      return
    }

    if (!isEdit) reset()
    toast.success(result.message)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <header className="mb-6 flex flex-wrap items-center justify-end gap-2">
        <CopyButton content={content} />
        <Button type="submit" size="sm">
          Save
        </Button>
      </header>
      <FieldGroup>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input {...field} id="title" aria-invalid={fieldState.invalid} placeholder="Prompt title" />
              <FieldDescription></FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="content"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <Textarea
                {...field}
                id="content"
                aria-invalid={fieldState.invalid}
                placeholder="Prompt instructions/content"
              />
              <FieldDescription></FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}
