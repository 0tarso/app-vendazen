import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useCustomer } from '@/src/contexts/CustomerContext'
import SaleCard from '../SaleCard'
import { PurchaseWithCustomer } from '@/src/schemas/Purchase/purchase-schema'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/src/constants/Colors'
import CustomButton from '../CustomButton'

export default function SalesList() {
  const { purchases, filterPurchasesDate } = useCustomer()

  const [purchasesFiltered, setPurchasesFiltered] = useState<PurchaseWithCustomer[] | null>(null)


  useEffect(() => {

    const filteringPurchases = purchases?.filter((purchase) => {

      const purchaseDate = new Date(purchase.created_at);
      purchaseDate.setHours(0, 0, 0, 0)

      const dateFilter = new Date(filterPurchasesDate)
      dateFilter.setHours(0, 0, 0, 0)

      console.log('Purchase date -> ', purchaseDate)
      console.log('DataFItler -> ', dateFilter)

      return purchaseDate.getFullYear() === dateFilter.getFullYear() &&
        purchaseDate.getMonth() === dateFilter.getMonth() &&
        purchaseDate.getDay() === dateFilter.getDay()
    })

    console.log(filteringPurchases)

    if (!filteringPurchases) {
      setPurchasesFiltered(null)
      return
    }

    setPurchasesFiltered(filteringPurchases)

  }, [filterPurchasesDate, purchases])

  const showAllPurchases = () => {
    setPurchasesFiltered(purchases)
  }

  return (
    <View style={{ flex: 1 }}>


      {purchasesFiltered && purchasesFiltered.length > 0 ? (
        <FlatList
          data={purchasesFiltered}
          renderItem={({ item }) => <SaleCard purchase={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name='calendar-clear-outline' size={60} color={COLORS.GreenPrimary} />
          <Text style={{ fontSize: 22, marginTop: 20, textAlign: 'center', fontFamily: "MontserratRegular" }}>Sem vendas nessa data</Text>

          <View style={{ width: '100%', marginTop: 50 }}>

            <CustomButton
              label='Todas as Vendas'
              onPress={showAllPurchases}
              isDisabled={false}
            />

          </View>
        </View>
      )}
    </View>
  )
}