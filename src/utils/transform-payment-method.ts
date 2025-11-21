export const transformMethodName = (method: string) => {
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