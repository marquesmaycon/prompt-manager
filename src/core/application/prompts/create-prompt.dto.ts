import z from 'zod'

export const createPromptSchema = z.object({
  title: z.string().min(1, 'Required'),
  content: z.string().min(1, 'Required'),
})

export type CreatePromptDTO = z.infer<typeof createPromptSchema>
