import api from "../../api/api"

export const insertPaymentAPI = async (customerId: number, paymentAmount: number, paymentMethod: string) => {

  enum ConvertedPayment {
    'Pix' = 'PIX',
    'Débito' = 'DEBIT CARD',
    'Crédito' = 'CREDIT CARD',
    'Dinheiro' = 'CASH'
  }

  const payment = {
    customerId,
    paymentAmount,
    paymentMethod: ConvertedPayment[paymentMethod as keyof typeof ConvertedPayment]
  }

  let response = false

  try {
    const { data, status } = await api.post('/purchases/apply-payment', payment)

    console.log(data.content)

    if (data) return response = true
  } catch (error) {
    // console.log('Erro ao criarr pagamnento')
    console.log(error)
    throw error
  }

  return response

}