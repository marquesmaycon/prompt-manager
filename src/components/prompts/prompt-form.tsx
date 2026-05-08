'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createPromptAction } from '@/app/actions/prompt.actions'
import { type CreatePromptDTO, createPromptSchema } from '@/core/application/prompts/create-prompt.dto'

import { Button } from '../ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export function PromptForm() {
  const router = useRouter()

  const form = useForm<CreatePromptDTO>({
    resolver: zodResolver(createPromptSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const submit = async (data: CreatePromptDTO) => {
    const result = await createPromptAction(data)

    if (!result.success) {
      toast.error(result.message)
      return
    }

    toast.success(result.message)
    form.reset()
    router.refresh()
  }

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      <header className="mb-6 flex flex-wrap items-center justify-end gap-2">
        <Button type="submit" size="sm">
          Save
        </Button>
      </header>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
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
          control={form.control}
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
