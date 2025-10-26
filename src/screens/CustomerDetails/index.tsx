import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { CustomerStackParamList } from '@/src/routes/customerStack.routes';
import { useCustomer } from '@/src/contexts/CustomerContext';
import { CustomerWithPurchasesAndPayments } from '@/src/schemas/Customer/customer-schema';
import CustomerTitle from '@/src/components/CustomerName';
import LastPurchaseList from '@/src/components/PurchaseList';
import { PurchaseSchema, PurchaseWithCustomer } from '@/src/schemas/Purchase/purchase-schema';
import SummaryCards from '@/src/components/SalesSummary';
import { getTotalDebts } from '@/src/utils/get-total-debts';
import { getTotalSales } from '@/src/utils/get-total-sales';
import { PaymentSchema } from '@/src/schemas/Payment/payment-schema';


type CustomerDetailsRouteProp = RouteProp<CustomerStackParamList, 'customer-details'>;

export default function CustomerDetails() {

  const { params: { customerId } } = useRoute<CustomerDetailsRouteProp>()

  const { getCustomerById } = useCustomer()

  const [customer, setCustomer] = useState<CustomerWithPurchasesAndPayments | null>(null)

  const [purchase, setPurchases] = useState<PurchaseSchema[] | null>(null)
  const [lastPurchases, setLastPurchases] = useState<PurchaseSchema[] | null>(null)

  const [payments, setPayments] = useState<PaymentSchema[] | null>(null)

  const [totalDebts, setTotalDebts] = useState(0)
  const [totalPurchases, setTotalPurchases] = useState(0)

  useEffect(() => {
    const customerData = getCustomerById(customerId)

    if (!customerData) return

    const lastFivePurchases = [...customerData.purchases]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);


    const totalDebts = getTotalDebts(customerData.purchases, 'all-time')
    const totalPurchases = getTotalSales(customerData.purchases, 'all-time')


    setTotalDebts(totalDebts)
    setTotalPurchases(totalPurchases)
    setLastPurchases(lastFivePurchases)
    setPurchases(customerData.purchases)
    setPayments(customerData.payments)
    setCustomer(customerData)
  }, [customerId])

  return (
    <View>
      {/* <NavigationHeader title='Cliente' /> */}

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <CustomerTitle
          name={customer ? customer.name : 'Undefined'}
          onPress={() => console.log('Abrir tela editar dados')}
        />

        <LastPurchaseList
          purchases={lastPurchases && lastPurchases}
        />

        <SummaryCards
          title='Resumo do Cliente'
          debtsValue={totalDebts}
          salesValue={totalPurchases}
        />

      </ScrollView>

    </View>
  )
}