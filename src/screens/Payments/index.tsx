import { View, Text } from 'react-native'
import React from 'react'
import ListItems from '@/src/components/ListItems'
import { useCustomer } from '@/src/contexts/CustomerContext'

export default function PaymentsScreen() {
  const { payments } = useCustomer()


  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <ListItems
        payments={payments ?? []}
      />
    </View>
  )
}