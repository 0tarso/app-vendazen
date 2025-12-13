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
import CustomerList, { CustomerListNavigationProp } from '../CustomerList'
import { useToast } from '@/src/hooks/useToast'
import { styles } from './styles'
import { deleteItemAction } from './actions'

interface ListItemsProps {
  purchases?: PurchaseWithCustomer[]
  payments?: PaymentWithCustomerName[]
  modal: boolean
}

export default function ListItems(props: ListItemsProps) {

  const { success, error } = useToast()

  const { deletePayment, deletePurchase, loadingPayment, loadingPurchase } = useCustomer()

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

    const isPurchase = "paid" in item
    const isPayment = "payment_method" in item

    if (isPayment) {

      console.log("é pagamento")
      const isDeleted = await deleteItemAction(item, 'payment', deletePayment)
      if (!isDeleted) {
        error('Erro ao deletar pagamento')
        return
      }
      success('Pagamento deletado com sucesso')
      return
    }

    if (isPurchase) {
      const isDeleted = await deleteItemAction(item, 'purchase', deletePurchase)
      if (!isDeleted) {
        error('Erro ao deletar venda')
        return
      }
      success('Venda deletada com sucesso')
      return
    }

  }


  return (
    <View style={styles.container}>
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
              ? <ListItemCard item={item} editMode buttonAction={(item) => handleDeleteItem(item)}
                isLoading={loadingPayment || loadingPurchase} />
              : <ListItemCard item={item} />)}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noDataMessageContainer}>
          <Ionicons name='calendar-clear-outline' size={60} color={COLORS.GreenPrimary} />
          <Text style={styles.noDataMessage}>
            {props.payments ? 'Nenhum pagamento nessa data' : 'Nenhuma venda nessa data'}</Text>

          <View style={styles.buttonContainer}>

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