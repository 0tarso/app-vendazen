import { CustomerWithPurchases } from "../schemas/Customer/customer-schema"
import api from "./api"

export const getCustomersAPI = async () => {

  // console.log('customerAPI')

  let response: CustomerWithPurchases[] | null = null

  const { data, status } = await api.get('/customers/list')

  if (data) {
    response = data.content
  }

  return response
}