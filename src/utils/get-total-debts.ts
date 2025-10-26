import { PurchaseSchema, PurchaseWithCustomer } from "@/src/schemas/Purchase/purchase-schema"

const today = new Date()
const actualMonth = today.getMonth()
const actualYear = today.getFullYear()


export const getTotalDebts = (purchases: PurchaseSchema[], period: "month" | "all-time") => {

  const totalDebts = purchases.reduce((acc, item) => {
    const purchaseDate = new Date(item.created_at)
    const purchaseIsUnpaid = !item.paid

    if (period === 'month') {
      const sameMonth = purchaseDate.getMonth() === actualMonth && purchaseDate.getFullYear() === actualYear

      if (sameMonth && purchaseIsUnpaid) {
        return acc + item.remaining_amount
      }

      return acc
    }

    if (period === 'all-time' && purchaseIsUnpaid) {
      return acc + item.remaining_amount
    }

    return acc
  }, 0)

  return totalDebts
}