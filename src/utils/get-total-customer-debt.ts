import { CustomerResponseSchema, CustomerWithPurchasesAndPayments } from "../schemas/Customer/customer-schema";

export const getCustomerTotalDebt = (customer: CustomerWithPurchasesAndPayments) => {
  const totalDebtSelectedCustomer = customer.purchases.reduce((acc, purchase) => {
    return acc + purchase.remaining_amount;
  }, 0) || 0;

  return totalDebtSelectedCustomer
}