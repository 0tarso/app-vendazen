import api from "@/src/api/api"

export const deletePurchaseAPI = async (purchaseId: number) => {
  let response = null

  const requestBody = {
    purchaseId: purchaseId

  }


  try {
    const { data, status } = await api.delete('/purchases/delete-purchase', { data: requestBody })

    response = data
  } catch (error) {
    console.log(error)
    throw error
  }

  return response
}