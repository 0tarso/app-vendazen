import z from 'zod'
import { customerResponseSchema, customerSchema } from '../Customer/customer-schema'


export const purchaseSchema = z.object({
  id: z.number(),
  customer_id: z.number(),
  paid: z.boolean(),
  amount: z.number(),
  remaining_amount: z.number(),
  due_date: z.string().transform((str) => new Date(str)).nullable(),
  created_at: z.string().transform((str) => new Date(str)),
  updated_at: z.string().transform((str) => new Date(str)).nullable(),
  deleted_at: z.string().transform((str) => new Date(str)).nullable()
})

export type PurchaseSchema = z.infer<typeof purchaseSchema>

export const createPurchaseInput = z.object({
  amount:
    z.coerce.number('Valor inválido')
      .refine(
        (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
        { message: 'O valor deve ter no máximo 2 casas decimais' }
      )
})
export type CreatePurchaseInput = z.infer<typeof createPurchaseInput>;

export const createPurchaseSchema = purchaseSchema.omit({
  id: true,
  paid: true,
  due_date: true,
  created_at: true,
  updated_at: true,
  remaining_amount: true,
  deleted_at: true
})
export type CreatePurchaseSchema = z.infer<typeof createPurchaseSchema>

export const purchaseWithCustomer = purchaseSchema.extend({
  customer_name: z.string()
})
export type PurchaseWithCustomer = z.infer<typeof purchaseWithCustomer>