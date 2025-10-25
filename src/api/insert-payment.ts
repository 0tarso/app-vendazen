import api from "./api"

export const insertPaymentAPI = async (customerId: number, paymentAmount: number) => {

  const payment = { customerId, paymentAmount }

  let response = false

  try {
    const { data, status } = await api.post('/purchases/apply-payment', payment)

    console.log(data.content)

    if (data) return response = true
  } catch (error) {
    console.log('Erro ao criarr pagamnento')
  }

  return response

}