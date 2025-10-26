import { PurchaseSchema, PurchaseWithCustomer } from "@/src/schemas/Purchase/purchase-schema"

const today = new Date()
const actualMonth = today.getMonth()
const actualYear = today.getFullYear()

export const getTotalSales = (purchases: PurchaseSchema[], period: "month" | "all-time") => {

  const totalSales = purchases.reduce((acc, item) => {
    const purchaseDate = new Date(item.created_at)

    const sameMonth = purchaseDate.getMonth() === actualMonth && purchaseDate.getFullYear() === actualYear

    if (period === 'month' && sameMonth) {
      return acc + item.amount
    }

    if (period === 'all-time') {
      return acc + item.amount
    }

    return acc
  }, 0)

  return totalSales
}
