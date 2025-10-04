import z from 'zod'


export const registerStepOneSchema = z.object({
  name: z.string({ required_error: 'Insira seu nome' }).min(3, 'Nome deve ter no mínimo 3 caracteres'),
})

export const registerStepTwoSchema = z.object({
  email: z.string({ required_error: 'Insira seu email.' }).email({ message: 'Email inválido.' }),
})

export const registerStepThreeSchema = z.object({
  password: z.string({ required_error: 'Insira sua senha' }).min(6, 'Senha deve ter no mínimo 6 caracteres.')
})

export const registerFinalSchema = z.object({
  name: registerStepOneSchema.shape.name,
  email: registerStepTwoSchema.shape.email,
  password: registerStepThreeSchema.shape.password
})

export type RegisterSchema = z.infer<typeof registerFinalSchema>