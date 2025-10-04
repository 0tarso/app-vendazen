import z from 'zod'

export const authSchema = z.object({
  email: z.string({ required_error: 'Insira seu email.' }).email({ message: 'Email inválido.' }),
  password: z.string({ required_error: 'Insira sua senha' }).min(6, 'Senha deve ter no mínimo 6 caracteres.')
})

export type AuthSchema = z.infer<typeof authSchema>