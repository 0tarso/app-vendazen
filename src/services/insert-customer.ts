import { CustomerResponseSchema } from "../schemas/Customer/customer-schema";
import { CreateCustomerSchema } from "../schemas/Customer/insert-customer-schema";
import api from "../api/api";

export const insertCustomerAPI = async (customerData: CreateCustomerSchema) => {

  let newUser: CustomerResponseSchema | null = null

  const clearData = {
    name: customerData.name,
    cpf: customerData.cpf ? customerData.cpf : null,
    phone: customerData.phone ? customerData.phone : null
  }

  try {
    const { data, status } = await api.post('/customers', clearData)

    if (data) newUser = data.content


  } catch (error) {
    console.log('Erro em insertCustomerAPI => ', error)

  }

  return newUser
}