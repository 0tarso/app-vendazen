import z from "zod";
import { cpfValidation } from "../../utils/cpf-validation";
import { purchaseSchema } from "../Purchase/purchase-schema";
import { paymentSchema } from "../Payment/payment-schema";

export const customerSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  name: z.string(),
  phone: z.string()
    .min(10, "Telefone deve conter no mínimo 10 dígitos")
    .max(11, "Telefone deve conter no máximo 11 dígitos")
    .regex(/^\d{10,15}$/, "Telefone deve conter apenas números")
    .nullable(),
  cpf: z.string()
    .length(11, "CPF deve conter 11 dígitos")
    .regex(/^\d{11}$/, "CPF deve conter apenas números")
    .refine((cpf) => {
      return cpfValidation(cpf);
    }, { message: "CPF inválido" })
    .nullable(),
  created_at: z.string().transform((str) => new Date(str)),
  updated_at: z.string().transform((str) => new Date(str)).nullable()
})


export const customerResponseSchema = customerSchema.omit({ user_id: true })
export type CustomerResponseSchema = z.infer<typeof customerResponseSchema>



export const createCustomerSchema = customerSchema.pick({
  name: true,
  phone: true,
  cpf: true
})
export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>



export const customerWithPurchasesAndPaymentsSchema = customerSchema.extend({
  purchases: z.array(purchaseSchema),
  payments: z.array(paymentSchema)
})
export type CustomerWithPurchasesAndPayments = z.infer<typeof customerWithPurchasesAndPaymentsSchema> 