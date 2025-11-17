import { CustomerWithPurchasesAndPayments } from "../schemas/Customer/customer-schema"
import api from "../api/api"

export const getCustomersAPI = async () => {


  let response: CustomerWithPurchasesAndPayments[] | null = null


  try {
    const { data, status } = await api.get('/customers/list')
    if (data) {
      response = data.content
    }

  } catch (error) {
    throw error
  }


  return response
}