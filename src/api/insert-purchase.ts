
import { CreatePurchaseSchema, PurchaseSchema } from '../schemas/Purchase/purchase-schema'
import { handleAxiosError } from '../utils/handle-axios-error'
import api from './api'

export const insertPurchaseAPI = async (purchaseData: CreatePurchaseSchema) => {


  let newPurchase: PurchaseSchema | null = null

  try {
    const { data, status } = await api.post('/purchases', purchaseData)

    if (data) newPurchase = data.content

  } catch (error) {
    const handled = handleAxiosError(error)

    console.log('Erro insertPurchaseAPI')
    throw error
  }


  return newPurchase
}