export const transformPaymentMethodName = (method: string, mode: 'display' | 'sendData') => {
  if (mode === 'display') {
    switch (method) {
      case 'PIX':
        return 'Pix'
      case 'CASH':
        return 'Dinheiro'
      case 'CREDIT CARD':
        return 'Cartão de Crédito'
      case 'DEBIT CARD':
        return 'Cartão de Débito'
      default:
        return 'Desconhecido'
    }
  }

  if (mode === 'sendData') {
    switch (method) {
      case 'Pix':
        return 'PIX'
      case 'Dinheiro':
        return 'CASH'
      case 'Cartão de Crédito':
        return 'CREDIT CARD'
      case 'Cartão de Débito':
        return 'DEBIT CARD'
      default:
        return 'Desconhecido'
    }
  }

  return 'Desconhecido'
}