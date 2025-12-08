import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CustomerResponseSchema, CustomerWithPurchasesAndPayments } from "../schemas/Customer/customer-schema";
import { getCustomersAPI } from "../services/customer/get-customers";
import { CreatePurchaseSchema, createPurchaseSchema, PurchaseSchema, PurchaseWithCustomer } from "../schemas/Purchase/purchase-schema";
import { useAuth } from "./AuthContext";
import { getTotalSales } from "../utils/get-total-sales";
import { getTotalDebts } from "../utils/get-total-debts";
import { nullable } from "zod";
import { CreateCustomerSchema } from "../schemas/Customer/insert-customer-schema";
import { insertCustomerAPI } from "../services/customer/insert-customer";
import { CreatePaymentSchema, PaymentWithCustomerName } from "../schemas/Payment/payment-schema";
import { insertPurchaseAPI } from "../services/purchase/insert-purchase";
import { insertPaymentAPI } from "../services/payment/insert-payment";
import { Toast } from "toastify-react-native";
import { updateCustomerService } from "../services/customer/update-customer";
import { handleAxiosError, NormalizedAxiosError } from "../utils/handle-axios-error";
import { deletePaymentAPI } from "../services/payment/delete-payment";
import { deletePurchaseAPI } from "../services/purchase/delete-purchase";

interface CustomerContextType {
  loadingCreateCustomer: boolean,
  loadingEditCustomer: boolean,
  loadingPayment: boolean,
  loadingPurchase: boolean,
  totalSales: number,
  totalDebts: number,
  payments: PaymentWithCustomerName[] | null,
  lastPayments: PaymentWithCustomerName[] | null,
  purchases: PurchaseWithCustomer[] | null,
  lastPurchases: PurchaseSchema[] | null,
  fullCustomerData: CustomerWithPurchasesAndPayments[] | null,
  loadingCustomerData: boolean,
  getCustomerById: (customerId: string) => CustomerWithPurchasesAndPayments | null,
  createCustomer: (userData: CreateCustomerSchema) => Promise<CustomerResponseSchema | null>
  createPurchase: (purchaseData: CreatePurchaseSchema) => Promise<boolean>,
  deletePurchase: (purchaseId: number) => Promise<boolean>,
  createPayment: (customerId: number, paymentAmount: number, paymentMethod: string) => Promise<boolean>,
  deletePayment: (paymentId: number) => Promise<boolean>,
  updateCustomer: (UpdateCustomer: { id: number, name?: string, cpf?: number, phone?: string }) => Promise<CustomerResponseSchema | NormalizedAxiosError | null>
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

  const [fullCustomerData, setFullCustomerData] = useState<CustomerWithPurchasesAndPayments[] | null>(null)

  const [totalSales, setTotalSales] = useState<number>(0)
  const [totalDebts, setTotalDebts] = useState<number>(0)

  const [purchases, setPurchases] = useState<PurchaseWithCustomer[] | null>(null)
  const [lastPurchases, setLastPurchases] = useState<PurchaseSchema[] | null>(null)

  const [payments, setPayments] = useState<PaymentWithCustomerName[] | null>(null)
  const [lastPayments, setLastPayments] = useState<PaymentWithCustomerName[] | null>(null)


  // atualizar nos forms as variaveis de carregamento
  // cada function terá seu próprio loading 
  const [loadingCustomerData, setLoadingCustomerData] = useState(true)
  const [loadingCreateCustomer, setLoadingCreateCustomer] = useState(false)
  const [loadingPurchase, setLoadingPurchase] = useState(false)
  const [loadingPayment, setLoadingPayment] = useState(false)
  const [loadingEditCustomer, setLoadingEditCustomer] = useState(false)

  const [errorGetCustomersData, setErrorGetCustomersData] = useState<null | NormalizedAxiosError>(null)

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
      await fetchCustomersData()
    }

    fetch()

  }, [userLogged])


  const fetchCustomersData = useCallback(async () => {

    console.log('Buscanod dados')

    setLoadingCustomerData(true)
    setErrorGetCustomersData(null)

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

      const totalSales = getTotalSales(purchases, 'all-time')

      const totalDebts = getTotalDebts(purchases, 'all-time')

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
      const handledError = handleAxiosError(error)
      setErrorGetCustomersData(handledError)


      console.log('Erro em CustomerProvider => ', error)
    } finally {
      setLoadingCustomerData(false)
    }
  }, [])


  const getCustomerById = useCallback((customerId: string) =>

    fullCustomerData?.find((customer) => customer.id.toString() === customerId) || null,

    [fullCustomerData])

  const createCustomer = useCallback(async (userData: CreateCustomerSchema) => {
    let newUser = null

    setLoadingCreateCustomer(true)
    try {
      newUser = await insertCustomerAPI(userData)

      if (!newUser) return newUser

      await fetchCustomersData()

    } catch (error) {
      console.log('Erro em createCustomer => ', error)

    } finally {
      setLoadingCreateCustomer(false)
    }

    return newUser
  }, [])


  const updateCustomer = useCallback(
    async (UpdateCustomer: { id: number, name?: string, cpf?: number, phone?: string }) => {

      let updatedCustomerResponse: CustomerResponseSchema | NormalizedAxiosError | null = null

      setLoadingEditCustomer(true)

      try {
        updatedCustomerResponse = await updateCustomerService(UpdateCustomer)

        if (!updatedCustomerResponse) return updatedCustomerResponse

        await fetchCustomersData()

      } catch (error) {

        //passar todos os erros do service para o contexto
        //mandar o erro para o componente e tratar a msg lá
        //ou criar função para tratar mensagem no componente


        const handledError = handleAxiosError(error)
        console.log(handledError.message)

        updatedCustomerResponse = handledError
      } finally {
        setLoadingEditCustomer(false)
      }

      return updatedCustomerResponse
    }, []
  )



  const createPurchase = useCallback(async (purchaseData: CreatePurchaseSchema) => {
    setLoadingPurchase(true)

    let response = false

    try {
      const newPurchase = await insertPurchaseAPI(purchaseData)

      if (!newPurchase) return response

      await fetchCustomersData()

      return response = true

    } catch (error) {
      console.log('Erro ao adicionar compra')
      console.log(error)

    } finally {
      setLoadingPurchase(false)
    }

    return response
  }, [])


  const createPayment = useCallback(async (customerId: number, paymentAmount: number, paymentMethod: string) => {
    setLoadingPayment(true)

    let response = false

    try {
      response = await insertPaymentAPI(customerId, paymentAmount, paymentMethod)

      if (!response) return response

      await fetchCustomersData()

    } catch (error) {
      console.log('Erro:', error)

    } finally {
      setLoadingPayment(false)
    }

    return response
  }, [fetchCustomersData])


  const deletePayment = useCallback(async (paymentId: number) => {
    setLoadingPayment(true)

    let response = false

    try {
      const apiResponse = await deletePaymentAPI(paymentId)

      if (!apiResponse) return response

      response = apiResponse
      await fetchCustomersData()

    } catch (error) {
      console.log('Erro ao deletar pagamento')
      console.log(error)

    } finally {
      setLoadingPayment(false)
    }

    return response
  }, [])

  const deletePurchase = useCallback(async (purchaseId: number) => {
    setLoadingPurchase(true)

    let response = false

    try {
      const apiResponse = await deletePurchaseAPI(purchaseId)

      if (!apiResponse) return response

      response = apiResponse
      await fetchCustomersData()

    } catch (error) {
      console.log("Erro ao deletar compra - CONTEXT")
      console.log(error)
    } finally {
      setLoadingPurchase(false)
    }
    return response
  }, [])



  const value: CustomerContextType = {
    fullCustomerData,
    getCustomerById,
    loadingCustomerData,
    loadingCreateCustomer,
    loadingPayment,
    loadingPurchase,
    purchases,
    lastPurchases,
    totalDebts,
    totalSales,
    createCustomer,
    createPurchase,
    deletePurchase,
    createPayment,
    deletePayment,
    payments,
    lastPayments,
    updateCustomer,
    loadingEditCustomer
  }


  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  )
}