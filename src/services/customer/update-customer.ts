import api from "../../api/api";
import { CustomerResponseSchema } from "../../schemas/Customer/customer-schema";


export const updateCustomerService = async (
  UpdateCustomer: { id: number, name?: string, cpf?: number, phone?: string }
) => {

  console.log('Log em service =>>', UpdateCustomer)

  let updatedCustomer: CustomerResponseSchema | null = null

  try {
    const { data } = await api.put('/customers/update', UpdateCustomer)

    if (data) return updatedCustomer = data.content


  } catch (error) {
    console.log('=======Erro updateCustomerService======')
    throw error
  }

  return updatedCustomer
}

