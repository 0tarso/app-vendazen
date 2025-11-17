import z from "zod";

export const paymentSchema = z.object({
  id: z.number(),
  customer_id: z.number(),
  created_at: z.string().transform((str) => new Date(str)),
  amount: z.number(),
  payment_method: z.enum({ PIX: 'PIX', CREDIT_CARD: 'CREDIT CARD', DEBIT_CARD: 'DEBIT CARD', CASH: 'CASH' }),
  deleted_at: z.string().transform((str) => new Date(str)).nullable()
})


export type PaymentSchema = z.infer<typeof paymentSchema>

export const paymentWithCustomerName = paymentSchema.extend({
  customer_name: z.string()
})


export const createPaymentSchema = z.object({
  amount:
    z.coerce.number('Valor inválido')
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        { message: 'O valor deve ter no máximo 2 casas decimais' }
      )
})
export type CreatePaymentSchema = z.infer<typeof createPaymentSchema>

export type PaymentWithCustomerName = PaymentSchema & { customer_name: string }