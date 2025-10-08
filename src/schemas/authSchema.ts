import z from 'zod'

export const authSchema = z.object({
  email: z.email({ message: 'Email inválido.' }).nonempty('Insira seu email.'),
  password: z.string().nonempty('Insira sua senha').min(6, 'Senha deve ter no mínimo 6 caracteres.')
})

export type AuthSchema = z.infer<typeof authSchema>