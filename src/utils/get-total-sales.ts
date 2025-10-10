import { PurchaseSchema } from "@/src/schemas/Purchase/purchase-schema"

const today = new Date()
const actualMonth = today.getMonth()
const actualYear = today.getFullYear()

export const getTotalSales = async (purchases: PurchaseSchema[]) => {

  const totalSales = purchases.reduce((acc, item) => {
    const purchaseDate = new Date(item.created_at)
    if (purchaseDate.getMonth() === actualMonth && purchaseDate.getFullYear() === actualYear) {
      acc += item.amount
    }

    return acc
  }, 0)

  return totalSales
}
