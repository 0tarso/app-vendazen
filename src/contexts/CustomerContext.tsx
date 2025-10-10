import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CustomerResponseSchema, CustomerWithPurchases } from "../schemas/Customer/customer-schema";
import { getCustomersAPI } from "../api/get-customers";
import { PurchaseSchema } from "../schemas/Purchase/purchase-schema";
import { useAuth } from "./AuthContext";
import { getTotalSales } from "../utils/get-total-sales";
import { getTotalDebts } from "../utils/get-total-debts";

interface CustomerContextType {
  customerWithPurchases: CustomerWithPurchases | null,
  totalSales: number,
  totalDebts: number,
  lastPurchases: PurchaseSchema[] | null
  loadingCustomerData: boolean,
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

export function useCustomer() {
  const context = useContext(CustomerContext)
  if (context === undefined) {
    throw new Error('useCustomer deve ser usado dentro de CustomerProvider')
  }

  return context
}


export function CustomerProvider({ children }: { children: ReactNode }) {
  const { userLogged } = useAuth()

  const [customerWithPurchases, setCustomerWithPurchases] = useState<CustomerWithPurchases | null>(null)

  const [totalSales, setTotalSales] = useState<number>(0)
  const [totalDebts, setTotalDebts] = useState<number>(0)

  const [lastPurchases, setLastPurchases] = useState<PurchaseSchema[] | null>(null)

  const [loadingCustomerData, setLoadingCustomerData] = useState(true)

  useEffect(() => {
    if (userLogged) {

      const fetch = async () => {
        console.log('CustomerProvider => Buscando dados')
        await getCustomerData()
      }

      fetch()
    }
  }, [userLogged])


  const getCustomerData = async () => {

    try {
      const data = await getCustomersAPI()
      if (data) {
        const purchases = data
          ?.flatMap((customer) => customer.purchases)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

        const totalSales = await getTotalSales(purchases)

        const totalDebts = await getTotalDebts(purchases)

        const lastPurchases = purchases.splice(0, 5)

        setLastPurchases(lastPurchases)
        setTotalSales(totalSales)
        setTotalDebts(totalDebts)
      }

    } catch (error) {
      console.log('Erro em CustomerProvider => ', error)
    } finally {
      setLoadingCustomerData(false)
    }
  }


  const value: CustomerContextType = {
    customerWithPurchases,
    loadingCustomerData,
    lastPurchases,
    totalDebts,
    totalSales,
  }


  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  )
}