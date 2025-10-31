import { number } from "zod";
import api from "../api/api";
import { UserResponse } from "../schemas/User/user-schema";
import { CustomerResponseSchema } from "../schemas/Customer/customer-schema";
import { handleAxiosError } from "../utils/handle-axios-error";


export const updateCustomerService = async (
  UpdateCustomer: { id: number, name?: string, cpf?: number, phone?: string }
) => {

  console.log('Log em service =>>', UpdateCustomer)

  let updatedCustomer: CustomerResponseSchema | null = null

  try {
    const { data } = await api.put('/customers/update', UpdateCustomer)

    if (data) return updatedCustomer = data.content


  } catch (error) {
    const handled = handleAxiosError(error)

    throw handled
  }

  return updatedCustomer
}

