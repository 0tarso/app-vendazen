import z from 'zod'


export const registerStepOneSchema = z.object({
  name: z
    .string()
    .nonempty('Insira seu nome')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(20, 'Nome deve ter no máximo 20 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome não deve conter caracteres especiais "´{}^.,;~*()"'),
})

export const registerStepTwoSchema = z.object({
  email: z
    .email({ message: 'Email inválido.' })
    .nonempty('Insira seu email.'),
})

export const registerStepThreeSchema = z.object({
  password: z
    .string()
    .nonempty('Insira sua senha')
    .min(6, 'Senha deve ter no mínimo 6 caracteres.')
    .max(18, 'Senha deve conter no máximo 18 caracteres')
    .regex(/\d/, 'Senha deve conter pelo menos um caractere numérico')
})

export const registerFinalSchema = z.object({
  name: registerStepOneSchema.shape.name,
  email: registerStepTwoSchema.shape.email,
  password: registerStepThreeSchema.shape.password
})

export type RegisterSchema = z.infer<typeof registerFinalSchema>