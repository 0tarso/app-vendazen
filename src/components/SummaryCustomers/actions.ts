import { CustomerWithPurchasesAndPayments } from "@/src/schemas/Customer/customer-schema";

export const calculateSummary = (
  fullCustomerData: CustomerWithPurchasesAndPayments[]

) => {

  const customersWithDebtCount = fullCustomerData.reduce((acc, customer) => {

    customer.purchases.forEach((purchase) => {
      if (purchase.paid === true) return

      acc = acc + 1
    })

    return acc
  }, 0)


  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const newCustomersThisWeekCount = fullCustomerData.filter(
    (customer) => {
      const createdAt = customer.created_at ? new Date(customer.created_at) : null;
      return createdAt && createdAt >= sevenDaysAgo;
    }
  ).length;


  let purchasesThisWeekCount = 0;
  fullCustomerData.forEach((customer) => {

    if (customer.purchases) {
      purchasesThisWeekCount += customer.purchases.filter((purchase) => {
        const purchaseDate = purchase.created_at ? new Date(purchase.created_at) : null;
        return purchaseDate && purchaseDate >= sevenDaysAgo;
      }).length;
    }
  });

  return { customersWithDebtCount, newCustomersThisWeekCount, purchasesThisWeekCount }
}