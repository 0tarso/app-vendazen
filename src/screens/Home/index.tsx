import { View, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './styles'
import HomeHeader from '@/src/components/HomeHeader'
import LastPurchaseList from '@/src/components/PurchaseList'
import SalesSummary from '@/src/components/SalesSummary'
import { useCustomer } from '@/src/contexts/CustomerContext'
import { COLORS } from '@/src/constants/Colors'

export default function HomeScreen() {

  const { lastPurchases, totalDebts, totalSales, loadingCustomerData } = useCustomer()

  return (
    <View style={styles.container}>
      <HomeHeader />

      {loadingCustomerData ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={COLORS.GreenPrimary} size={50} />
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <LastPurchaseList
            purchases={lastPurchases}
          />

          <SalesSummary
            debtsValue={totalDebts}
            salesValue={totalSales}
          />

        </ScrollView>
      )}
    </View>
  )
}