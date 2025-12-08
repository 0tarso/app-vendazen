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
import { useNavigation } from '@react-navigation/native'
import CustomerList, { CustomerListNavigationProp } from '../CustomerList'
import { useToast } from '@/src/hooks/useToast'
interface ListItemsProps {
  purchases?: PurchaseWithCustomer[]
  payments?: PaymentWithCustomerName[]
  modal: boolean
}

export default function ListItems(props: ListItemsProps) {

  const navigation = useNavigation<CustomerListNavigationProp>()
  const { success } = useToast()

  const { deletePayment, deletePurchase, payments, purchases, loadingPayment, loadingPurchase } = useCustomer()

  const [filteredItems, setFilteredItems] = useState<(PurchaseWithCustomer | PaymentWithCustomerName)[] | null>(null)

  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString())

  const items = props.purchases || props.payments;

  useEffect(() => {
    if (props.modal) console.log('Modal mode')

    if (!items) {
      setFilteredItems(null);
      return;
    }

    const dateToFilter = new Date(filterDate).toDateString();

    const filtered = items.filter((item) => {
      const itemDate = new Date(item.created_at).toDateString();
      return itemDate === dateToFilter;
    });

    setFilteredItems(filtered.length > 0 ? filtered : null);

  }, [filterDate, items]);

  const showAllItems = () => {
    setFilteredItems(items || null);
  }

  const handleSetFilterDate = (date: string) => {
    setFilterDate(date)
  }

  const handleDeleteItem = async (item: PurchaseWithCustomer | PaymentWithCustomerName) => {
    console.log('Delete item')
    console.log(item)

    const isPayment = "payment_method" in item

    if (isPayment) {
      const response = await deletePayment(item.id)

      if (response.statusText === "OK") {
        success('Pagamento deletado com sucesso')
      }

      console.log("Response deletePayment")
      console.log(response)
      return
    }
    else {
      const response = await deletePurchase(item.id)

      if (response) {
        success('Venda deletada com sucesso')
      }

      console.log("Response deletePurchase")
      console.log(response)
      return
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        position: 'absolute',
        bottom: 30
      }}>
        <CustomDatePicker
          onChangeDate={(dateString) => handleSetFilterDate(dateString)} select='date'
        />
      </View>

      {filteredItems && filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems as (PurchaseWithCustomer | PaymentWithCustomerName)[]}
          renderItem={({ item }) => (
            props.modal
              ? <ListItemCard item={item} editMode buttonAction={(item) => handleDeleteItem(item)} isLoading={loadingPayment || loadingPurchase} />
              : <ListItemCard item={item} />)}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name='calendar-clear-outline' size={60} color={COLORS.GreenPrimary} />
          <Text style={{ fontSize: 22, marginTop: 20, textAlign: 'center', fontFamily: "MontserratRegular" }}>
            {props.payments ? 'Nenhum pagamento nessa data' : 'Nenhuma venda nessa data'}</Text>

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