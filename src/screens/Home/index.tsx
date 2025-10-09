import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import HomeHeader from '@/src/components/HomeHeader'
import { getCustomersAPI } from '@/src/api/get-customers'
import PurchaseList from '@/src/components/PurchaseList'
import SalesSummary from '@/src/components/SalesSummary'

export default function HomeScreen() {



  return (
    <View style={styles.container}>
      <HomeHeader />

      <PurchaseList />

      <SalesSummary />
    </View>
  )
}