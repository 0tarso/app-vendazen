import { CustomerWithPurchasesAndPayments } from "../schemas/Customer/customer-schema"
import api from "../api/api"

export const getCustomersAPI = async () => {

  // console.log('customerAPI')

  let response: CustomerWithPurchasesAndPayments[] | null = null

  const { data, status } = await api.get('/customers/list')

  if (data) {
    response = data.content
  }

  return response
}