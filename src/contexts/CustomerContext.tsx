import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CustomerResponseSchema, CustomerWithPurchasesAndPayments } from "../schemas/Customer/customer-schema";
import { getCustomersAPI } from "../api/get-customers";
import { CreatePurchaseSchema, createPurchaseSchema, PurchaseSchema, PurchaseWithCustomer } from "../schemas/Purchase/purchase-schema";
import { useAuth } from "./AuthContext";
import { getTotalSales } from "../utils/get-total-sales";
import { getTotalDebts } from "../utils/get-total-debts";
import { nullable } from "zod";
import { CreateCustomerSchema } from "../schemas/Customer/insert-customer-schema";
import { insertCustomerAPI } from "../api/insert-customer";
import { CreatePaymentSchema, PaymentWithCustomerName } from "../schemas/Payment/payment-schema";
import { insertPurchaseAPI } from "../api/insert-purchase";
import { insertPaymentAPI } from "../api/insert-payment";

interface CustomerContextType {
  totalSales: number,
  totalDebts: number,
  payments: PaymentWithCustomerName[] | null,
  lastPayments: PaymentWithCustomerName[] | null,
  purchases: PurchaseWithCustomer[] | null,
  lastPurchases: PurchaseSchema[] | null,
  fullCustomerData: CustomerWithPurchasesAndPayments[] | null,
  loadingCustomerData: boolean,
  filterPurchasesDate: string,
  setFilterPurchasesDate: React.Dispatch<React.SetStateAction<string>>
  getCustomerById: (customerId: string) => CustomerWithPurchasesAndPayments | null,
  createCustomer: (userData: CreateCustomerSchema) => Promise<CustomerResponseSchema | null>
  createPurchase: (purchaseData: CreatePurchaseSchema) => Promise<boolean>,
  createPayment: (customerId: number, paymentAmount: number, paymentMethod: string) => Promise<boolean>

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

  const [fullCustomerData, setFullCustomerData] = useState<CustomerWithPurchasesAndPayments[] | null>(null)

  const [totalSales, setTotalSales] = useState<number>(0)
  const [totalDebts, setTotalDebts] = useState<number>(0)

  const [purchases, setPurchases] = useState<PurchaseWithCustomer[] | null>(null)
  const [lastPurchases, setLastPurchases] = useState<PurchaseSchema[] | null>(null)

  const [payments, setPayments] = useState<PaymentWithCustomerName[] | null>(null)
  const [lastPayments, setLastPayments] = useState<PaymentWithCustomerName[] | null>(null)

  const [loadingCustomerData, setLoadingCustomerData] = useState(true)

  useEffect(() => {
    if (!userLogged) {
      setFullCustomerData(null)
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
            customer_name: customer.name,
          }))
        )
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      const payments = customersData
        ?.flatMap((customer) =>
          customer.payments.map((payment) => ({
            ...payment,
            customer_name: customer.name,
          }))
        )
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      const totalSales = getTotalSales(purchases, 'month')

      const totalDebts = getTotalDebts(purchases, 'month')

      const lastPurchases = purchases.slice(0, 5)
      const lastPayments = payments.slice(0, 5)

      setLastPurchases(lastPurchases)
      setTotalSales(totalSales)
      setTotalDebts(totalDebts)
      setPurchases(purchases)
      setPayments(payments)
      setLastPayments(lastPayments)
      setFullCustomerData(customersDataSorted)


    } catch (error) {
      console.log('Erro em CustomerProvider => ', error)
    } finally {
      setLoadingCustomerData(false)
    }
  }


  const getCustomerById = (customerId: string) => {

    const customer = fullCustomerData?.filter((customer) => customer.id.toString() === customerId)[0]

    if (!customer) return null

    return customer
  }

  const createCustomer = async (userData: CreateCustomerSchema) => {
    let newUser = null

    setLoadingCustomerData(true)
    try {
      newUser = await insertCustomerAPI(userData)

      if (newUser) {
        console.log(newUser)

        await getCustomerData()
      }

    } catch (error) {
      console.log('Erro em createCustomer => ', error)
    } finally {
      setLoadingCustomerData(false)
    }

    return newUser
  }


  const createPurchase = async (purchaseData: CreatePurchaseSchema) => {
    setLoadingCustomerData(true)

    let response = false

    try {
      const newPurchase = await insertPurchaseAPI(purchaseData)

      if (!newPurchase) {
        return response = false
      }

      await getCustomerData()

      return response = true

    } catch (error) {
      console.log('Erro ao adicionar compra')
      console.log(error)

    } finally {
      setLoadingCustomerData(false)
    }

    return response
  }


  const createPayment = async (customerId: number, paymentAmount: number, paymentMethod: string) => {
    setLoadingCustomerData(true)

    let response = false

    try {
      response = await insertPaymentAPI(customerId, paymentAmount, paymentMethod)

      if (!response) {
        alert('Erro ao criar pagamento')
        return response
      }

      await getCustomerData()

    } catch (error) {
      console.log('Erro:', error)

    } finally {
      setLoadingCustomerData(false)
    }

    return response
  }

  const value: CustomerContextType = {
    fullCustomerData,
    getCustomerById,
    loadingCustomerData,
    purchases,
    lastPurchases,
    filterPurchasesDate,
    setFilterPurchasesDate,
    totalDebts,
    totalSales,
    // filterPurchases,
    createCustomer,
    createPurchase,
    createPayment,
    payments,
    lastPayments
  }


  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  )
}