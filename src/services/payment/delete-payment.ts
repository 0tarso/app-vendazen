import api from "@/src/api/api"

export const deletePaymentAPI = async (paymentId: number) => {
  let response = null

  const requestBody = {
    paymentId: paymentId
  }

  try {
    const { data, status } = await api.delete('/purchases/delete-payment', { data: requestBody })

    response = data

  } catch (error) {
    console.log(error)
    throw error
  }

  return response
}