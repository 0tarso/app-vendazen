import { PurchaseSchema } from "@/src/schemas/Purchase/purchase-schema"

const today = new Date()
const actualMonth = today.getMonth()
const actualYear = today.getFullYear()


export const getTotalDebts = async (purchases: PurchaseSchema[]) => {
  const totalDebts = purchases.reduce((acc, item) => {
    const purchaseDate = new Date(item.created_at)
    const purchaseStatus = item.paid

    if (purchaseDate.getMonth() === actualMonth && purchaseDate.getFullYear() === actualYear && purchaseStatus === false) {
      acc += item.amount
    }

    return acc
  }, 0)

  return totalDebts
}