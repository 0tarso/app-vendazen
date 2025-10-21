import z, { number } from "zod";

export const paymentSchema = z.object({
  id: z.number(),
  customer_id: z.number(),
  created_at: z.string().transform((str) => new Date(str)),
  amount: z.number(),

})


export type PaymentSchema = z.infer<typeof paymentSchema>

export const paymentWithCustomerName = paymentSchema.extend({
  customer_name: z.string()
})

export type PaymentWithCustomerName = PaymentSchema & { customer_name: string }