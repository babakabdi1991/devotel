import { z } from 'zod'

export const baseSchema = z.object({
  todo: z.string().trim().min(1, 'Todo text is required').max(100, 'Todo must be at most 100 characters'),
})

export type TodoFormData = z.infer<typeof baseSchema>
