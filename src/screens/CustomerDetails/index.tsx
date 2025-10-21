import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { CustomerStackParamList } from '@/src/routes/customerStack.routes';
import { useCustomer } from '@/src/contexts/CustomerContext';
import { CustomerWithPurchasesAndPayments } from '@/src/schemas/Customer/customer-schema';
import NavigationHeader from '@/src/components/NavigationHeader';
import { Ionicons } from '@expo/vector-icons';
import CustomerTitle from '@/src/components/CustomerName';
import LastPurchaseList from '@/src/components/PurchaseList';
import { PurchaseSchema } from '@/src/schemas/Purchase/purchase-schema';


type CustomerDetailsRouteProp = RouteProp<CustomerStackParamList, 'customer-details'>;

export default function CustomerDetails() {

  const { params: { customerId } } = useRoute<CustomerDetailsRouteProp>()

  const { getCustomerById } = useCustomer()

  const [customer, setCustomer] = useState<CustomerWithPurchasesAndPayments | null>(null)
  const [lastPurchases, setLastPurchases] = useState<PurchaseSchema[] | null>(null)

  useEffect(() => {
    const customerData = getCustomerById(customerId)

    if (!customerData) return

    const lastFivePurchases = [...customerData.purchases]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);

    setLastPurchases(lastFivePurchases);
    setCustomer(customerData)
  }, [customerId])

  return (
    <View>
      <NavigationHeader title='Cliente' />

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

      </ScrollView>

    </View>
  )
}