import z from 'zod'


export const purchaseSchema = z.object({
  id: z.number(),
  customer_id: z.number(),
  paid: z.boolean(),
  amount: z.number(),
  due_date: z.string().transform((str) => new Date(str)).nullable(),
  created_at: z.string().transform((str) => new Date(str)),
  updated_at: z.string().transform((str) => new Date(str)).nullable()
})

export type PurchaseSchema = z.infer<typeof purchaseSchema>

export const createPurchaseSchema = purchaseSchema.omit({
  id: true, paid: true, due_date: true, created_at: true, updated_at: true
})
export type CreatePurchaseDTO = z.infer<typeof createPurchaseSchema>