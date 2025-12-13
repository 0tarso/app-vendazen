import { useCustomer } from "@/src/contexts/CustomerContext";
import { PaymentWithCustomerName } from "@/src/schemas/Payment/payment-schema";
import { PurchaseWithCustomer } from "@/src/schemas/Purchase/purchase-schema";

/**
 * Action to delete a purchase or payment from a customer..
 *
 * @param {PurchaseWithCustomer | PaymentWithCustomerName} item - The item that will be deleted.
 * @param {"purchase" | "payment"} itemType - The type of item that will be deleted.
 * @param {(id: number) => Promise<{ statusText: string }>} deleteMethod -The function responsible for deleting the item by ID.
 * @returns {Promise<boolean>} If item has been deleted, it returns true
 */


export const deleteItemAction = async (
  item: PurchaseWithCustomer | PaymentWithCustomerName,
  itemType: 'purchase' | 'payment',
  deleteMethod: (id: number) => Promise<any>
) => {
  let isDeleted = false

  console.log('===> Delete Item Action\n', item)

  if (itemType === 'payment') {
    const response = await deleteMethod(item.id)

    if (response.statusText === "OK") {
      console.log("Pagamento deletado com sucesso")
      isDeleted = true

    }

    return isDeleted
  }

  if (itemType === 'purchase') {
    const response = await deleteMethod(item.id)

    if (response.statusText === "OK") {
      console.log("Response deletePurchase")
      console.log(response)
      isDeleted = true

    }
    return isDeleted
  }

  return isDeleted
}