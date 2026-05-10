import z from 'zod'

export const updatePromptSchema = z.object({
  id: z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  content: z.string().min(1, 'Required'),
})

export type UpdatePromptDTO = z.infer<typeof updatePromptSchema>
