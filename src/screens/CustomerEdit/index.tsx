import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { CustomerStackParamList } from '@/src/routes/customerStack.routes'
import { CustomerWithPurchasesAndPayments } from '@/src/schemas/Customer/customer-schema'
import { useCustomer } from '@/src/contexts/CustomerContext'
import FormEditCustomer from '@/src/components/FormEditCustomer'

type CustomerEditRouteProp = RouteProp<CustomerStackParamList, 'customer-edit'>

export default function CustomerEditScreen() {
  const { params: { customerId } } = useRoute<CustomerEditRouteProp>()

  const { getCustomerById } = useCustomer()

  const [customer, setCustomer] = useState<
    Pick<CustomerWithPurchasesAndPayments, 'id' | 'cpf' | 'name' | 'phone'> | null
  >(null)

  useEffect(() => {
    const customerData = getCustomerById(customerId)

    if (!customerData) return

    const customer = {
      id: customerData.id,
      cpf: customerData.cpf,
      name: customerData.name,
      phone: customerData.phone
    }

    setCustomer(customer)

  }, [customerId])


  return (
    <View style={{ paddingHorizontal: 20, flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 140}
      >
        {customer ? (
          <FormEditCustomer customer={customer} />
        ) : (
          <Text>Ops, erro ao buscar cliente</Text>
        )}

      </KeyboardAvoidingView>

    </View>
  )
}