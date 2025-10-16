import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CustomerResponseSchema, CustomerWithPurchases } from "../schemas/Customer/customer-schema";
import { getCustomersAPI } from "../api/get-customers";
import { PurchaseSchema, PurchaseWithCustomer } from "../schemas/Purchase/purchase-schema";
import { useAuth } from "./AuthContext";
import { getTotalSales } from "../utils/get-total-sales";
import { getTotalDebts } from "../utils/get-total-debts";
import { nullable } from "zod";

interface CustomerContextType {
  customerWithPurchases: CustomerWithPurchases[] | null,
  totalSales: number,
  totalDebts: number,
  lastPurchases: PurchaseSchema[] | null,
  purchases: PurchaseWithCustomer[] | null,
  loadingCustomerData: boolean,
  filterPurchasesDate: string,
  setFilterPurchasesDate: React.Dispatch<React.SetStateAction<string>>
  getCustomerById: (customerId: string) => CustomerWithPurchases | null
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

  const [filterPurchasesDate, setFilterPurchasesDate] = useState(new Date().toISOString())

  const [customerWithPurchases, setCustomerWithPurchases] = useState<CustomerWithPurchases[] | null>(null)

  const [totalSales, setTotalSales] = useState<number>(0)
  const [totalDebts, setTotalDebts] = useState<number>(0)

  const [purchases, setPurchases] = useState<PurchaseWithCustomer[] | null>(null)
  const [lastPurchases, setLastPurchases] = useState<PurchaseSchema[] | null>(null)

  const [loadingCustomerData, setLoadingCustomerData] = useState(true)

  useEffect(() => {
    if (!userLogged) {
      setCustomerWithPurchases(null)
      setTotalDebts(0)
      setTotalSales(0)
      setPurchases(null)
      setLastPurchases(null)
      return
    }

    const fetch = async () => {
      console.log('CustomerProvider => Buscando dados')
      await getCustomerData()
    }

    fetch()

  }, [userLogged])


  const getCustomerData = async () => {

    try {
      const customersData = await getCustomersAPI()

      if (!customersData) return

      const customersDataSorted = [...customersData].sort((a, b) =>
        a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' })
      )

      const purchases = customersData
        ?.flatMap((customer) =>
          customer.purchases.map((purchase) => ({
            ...purchase,
            customerName: customer.name,
          }))
        )
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      const totalSales = await getTotalSales(purchases)

      const totalDebts = await getTotalDebts(purchases)

      const lastPurchases = purchases.slice(0, 5)

      setLastPurchases(lastPurchases)
      setTotalSales(totalSales)
      setTotalDebts(totalDebts)
      setPurchases(purchases)
      setCustomerWithPurchases(customersDataSorted)


    } catch (error) {
      console.log('Erro em CustomerProvider => ', error)
    } finally {
      setLoadingCustomerData(false)
    }
  }


  const getCustomerById = (customerId: string) => {

    const customer = customerWithPurchases?.filter((customer) => customer.id.toString() === customerId)[0]

    if (!customer) return null

    return customer
  }

  const value: CustomerContextType = {
    customerWithPurchases,
    loadingCustomerData,
    lastPurchases,
    totalDebts,
    totalSales,
    purchases,
    // filterPurchases,
    filterPurchasesDate,
    setFilterPurchasesDate,
    getCustomerById
  }


  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  )
}