import z from 'zod';

export const userSchema = z.object({
  id: z.number(),
  user_id: z.uuid(),
  email: z.email(),
  password: z.string(),
  name: z.string(),
  birthday: z.string().transform((str) => new Date(str)).nullable(),
  created_at: z.string().transform((str) => new Date(str)),
  updated_at: z.string().transform((str) => new Date(str)).nullable()
})

export const userResponseSchema = userSchema.omit({ id: true, password: true, })
export type UserResponse = z.infer<typeof userResponseSchema>


export const userByIdResponseSchema = userSchema.omit({ password: true })
export type UserIdResponse = z.infer<typeof userByIdResponseSchema>


export const userByEmailResponseSchema = userSchema.pick({
  user_id: true,
  email: true,
  password: true
})
export type UserByEmailResponseSchema = z.infer<typeof userByEmailResponseSchema>
