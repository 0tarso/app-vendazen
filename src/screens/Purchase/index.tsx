import { View, Text } from 'react-native'
import React from 'react'
import SalesList from '@/src/components/SalesList'

export default function PurchasesScreen() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <SalesList />
    </View>
  )
}