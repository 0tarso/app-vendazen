import { View, Text } from 'react-native'
import React from 'react'
import ListItems from '@/src/components/ListItems'
import { useCustomer } from '@/src/contexts/CustomerContext'

export default function PurchasesScreen() {

  const { purchases } = useCustomer()

  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <ListItems
        purchases={purchases ?? []}
        modal={false}
      />
    </View>
  )
}