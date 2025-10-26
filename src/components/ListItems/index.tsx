import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useCustomer } from '@/src/contexts/CustomerContext'
import ListItemCard from '../ListItemCard'
import { PurchaseWithCustomer } from '@/src/schemas/Purchase/purchase-schema'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/src/constants/Colors'
import CustomButton from '../CustomButton'
import CustomDatePicker from '../CustomDatePicker'
import { PaymentSchema, PaymentWithCustomerName } from '@/src/schemas/Payment/payment-schema'

interface ListItemsProps {
  purchases?: PurchaseWithCustomer[]
  payments?: PaymentWithCustomerName[]
}

export default function ListItems(props: ListItemsProps) {


  // const { purchases } = useCustomer()

  const [filteredItems, setFilteredItems] = useState<PurchaseWithCustomer[] | PaymentWithCustomerName[] | null>(null)

  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString())


  useEffect(() => {

    if (props.purchases) {

      const filteringPurchases = props.purchases?.filter((purchase) => {

        const purchaseDate = new Date(purchase.created_at);
        purchaseDate.setHours(0, 0, 0, 0)

        const dateFilter = new Date(filterDate)
        dateFilter.setHours(0, 0, 0, 0)

        return purchaseDate.getFullYear() === dateFilter.getFullYear() &&
          purchaseDate.getMonth() === dateFilter.getMonth() &&
          purchaseDate.getDate() === dateFilter.getDate()
      })


      if (!filteringPurchases || filteringPurchases?.length === 0) {
        setFilteredItems(null)
        return
      }

      setFilteredItems(filteringPurchases)
      return
    }
    if (props.payments) {

      const filteringPayments = props.payments?.filter((payment) => {

        const purchaseDate = new Date(payment.created_at);
        purchaseDate.setHours(0, 0, 0, 0)

        const dateFilter = new Date(filterDate)
        dateFilter.setHours(0, 0, 0, 0)

        return purchaseDate.getFullYear() === dateFilter.getFullYear() &&
          purchaseDate.getMonth() === dateFilter.getMonth() &&
          purchaseDate.getDate() === dateFilter.getDate()
      })


      if (!filteringPayments || filteringPayments?.length === 0) {
        setFilteredItems(null)
        return
      }

      setFilteredItems(filteringPayments)
      return
    }


  }, [filterDate, props.payments, props.purchases])

  const showAllItems = () => {

    if (props.purchases) return setFilteredItems(props.purchases)

    if (props.payments) return setFilteredItems(props.payments)
  }

  const handleSetFilterDate = (date: string) => {
    setFilterDate(date)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        position: 'absolute',
        bottom: 30
      }}>
        <CustomDatePicker
          onChangeDate={(dateString) => handleSetFilterDate(dateString)}
        />
      </View>

      {filteredItems && filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => <ListItemCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name='calendar-clear-outline' size={60} color={COLORS.GreenPrimary} />
          <Text style={{ fontSize: 22, marginTop: 20, textAlign: 'center', fontFamily: "MontserratRegular" }}>Sem vendas nessa data</Text>

          <View style={{ width: '100%', marginTop: 50 }}>

            <CustomButton
              label={
                props.payments ? 'Todos os pagamentos' : 'Todas as vendas'
              }
              onPress={showAllItems}
              isDisabled={false}
            />

          </View>
        </View>
      )}
    </View>
  )
}