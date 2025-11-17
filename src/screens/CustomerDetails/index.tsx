import { View, ScrollView, Modal, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { CustomerStackParamList } from '@/src/routes/customerStack.routes';
import { useCustomer } from '@/src/contexts/CustomerContext';
import { CustomerWithPurchasesAndPayments } from '@/src/schemas/Customer/customer-schema';
import CustomerTitle from '@/src/components/CustomerName';
import LastPurchaseList from '@/src/components/PurchaseList';
import { PurchaseSchema, PurchaseWithCustomer } from '@/src/schemas/Purchase/purchase-schema';
import SummaryCards from '@/src/components/SalesSummary';
import { getTotalDebts } from '@/src/utils/get-total-debts';
import { getTotalSales } from '@/src/utils/get-total-sales';
import { PaymentSchema, PaymentWithCustomerName } from '@/src/schemas/Payment/payment-schema';
import CustomButton from '@/src/components/CustomButton';
import ModalListItems from '@/src/components/ModalListItems';
import { COLORS } from '@/src/constants/Colors';


export type CustomerDetailsRouteProp = RouteProp<CustomerStackParamList, 'customer-details'>;

export default function CustomerDetails() {

  const { params: { customerId } } = useRoute<CustomerDetailsRouteProp>()
  const { navigate } = useNavigation<NavigationProp<CustomerStackParamList>>()

  const { getCustomerById } = useCustomer()

  const [customer, setCustomer] = useState<CustomerWithPurchasesAndPayments | null>(null)

  const [purchases, setPurchases] = useState<PurchaseWithCustomer[] | null>(null)
  const [lastPurchases, setLastPurchases] = useState<PurchaseSchema[] | null>(null)

  const [payments, setPayments] = useState<PaymentWithCustomerName[] | null>(null)

  const [totalDebts, setTotalDebts] = useState(0)
  const [totalPurchases, setTotalPurchases] = useState(0)

  const [showPaymentsModal, setShowPaymentsModal] = useState(false)
  const [showPurchasesModal, setShowPurchasesModal] = useState(false)

  useEffect(() => {
    const customerData = getCustomerById(customerId)

    console.log(customerData?.credit_balance)

    if (!customerData) return

    const lastFivePurchases = [...customerData.purchases]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);


    const totalDebts = getTotalDebts(customerData.purchases, 'all-time')
    const totalPurchases = getTotalSales(customerData.purchases, 'all-time')

    const purchases = customerData.purchases.map((purchase) => ({
      ...purchase,
      customer_name: customerData.name,
    })
    )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    const payments = customerData.payments.map((payment) => ({
      ...payment,
      customer_name: customerData.name,
    })
    )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    setTotalDebts(totalDebts)
    setTotalPurchases(totalPurchases)
    setLastPurchases(lastFivePurchases)
    setPurchases(purchases)
    setPayments(payments)
    setCustomer(customerData)
  }, [customerId])


  const handleNavigate = () => {
    navigate('customer-edit', { customerId: customerId })
  }

  const handleShowPaymentsModal = () => {
    setShowPaymentsModal(!showPaymentsModal)
  }
  const handleShowPurchasesModal = () => {
    setShowPurchasesModal(!showPurchasesModal)
  }

  return (
    <View>
      {/* <NavigationHeader title='Cliente' /> */}

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <CustomerTitle
          name={customer ? customer.name : 'Undefined'}
          onPress={handleNavigate}
        />

        <Text
          style={{ paddingHorizontal: 20, fontFamily: 'MontserratRegular', color: COLORS.GrayFont }}
        >Possui R${customer?.credit_balance?.toFixed(2)} em crédito</Text>

        <LastPurchaseList
          purchases={lastPurchases && lastPurchases}
        />

        <SummaryCards
          title='Resumo do Cliente'
          debtsValue={totalDebts}
          salesValue={totalPurchases}
        />

        <View style={{ paddingHorizontal: 20, rowGap: 10, marginVertical: 20, }}>

          <CustomButton
            isDisabled={false}
            label='Vendas'
            onPress={handleShowPurchasesModal}
          />
          <CustomButton
            isDisabled={false}
            label='Pagamentos'
            onPress={handleShowPaymentsModal}
          />
        </View>


        <ModalListItems
          handleShowModal={handleShowPurchasesModal}
          title={`Vendas de ${customer?.name}`}
          visible={showPurchasesModal}
          purchases={purchases}
        />

        <ModalListItems
          handleShowModal={handleShowPaymentsModal}
          title={`Pagamentos de ${customer?.name}`}
          visible={showPaymentsModal}
          payments={payments}
        />

      </ScrollView>

    </View>
  )
}