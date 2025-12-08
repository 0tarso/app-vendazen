import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PurchaseWithCustomer } from '@/src/schemas/Purchase/purchase-schema'
import { COLORS } from '@/src/constants/Colors'
import { PaymentWithCustomerName } from '@/src/schemas/Payment/payment-schema'
import { Ionicons } from '@expo/vector-icons'
import { transformPaymentMethodName } from '@/src/utils/transform-payment-method'
import CustomButton from '../CustomButton'


interface ListItemCardProps {
  item: PurchaseWithCustomer | PaymentWithCustomerName
  editMode?: boolean
  buttonAction?: (item: PurchaseWithCustomer | PaymentWithCustomerName) => void
  isLoading?: boolean
}

export enum PaymentMethod {
  'PIX' = 'Pix',
  'DEBIT CARD' = 'Débito',
  'CREDIT CARD' = 'Crédito',
  'CASH' = 'Dinheiro'
}

export default function ListItemCard(props: ListItemCardProps) {
  // console.log(props.item)

  const [dateToString, setDateToString] = useState('')
  const [time, setTime] = useState('')
  const [customerName, setCustomerName] = useState('')

  const [showDeleteMode, setShowDeleteMode] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState<string>('')

  useEffect(() => {
    if (props.item) {
      // console.log(props.item)
      const date = new Date(props.item.created_at)
      const convertedDate = new Date(date).toLocaleDateString('pt-BR')

      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const time = `${hours}:${minutes}`

      const nameParts = props.item.customer_name.split(' ');
      const name = nameParts[0];
      const lastNameInitial = nameParts.length > 1 ? nameParts[1][0].toUpperCase() : null;

      const fullName = `${name} ${lastNameInitial ? lastNameInitial + '.' : ''}`

      if ('payment_method' in props.item) {
        const method = props.item.payment_method
        if (method) setPaymentMethod(transformPaymentMethodName(method, 'display'))
      }

      setTime(time)
      setDateToString(convertedDate)
      setCustomerName(fullName)
    }

  }, [])

  if (props.editMode) {
    return (
      <View style={styles.container} >

        {showDeleteMode ? (
          <View style={styles.deleteContainer}>

            <Text style={styles.deleteMessage}>Deseja deletar este item?</Text>
            <View>
              <Text style={{ fontFamily: 'MontserratRegular', fontSize: 16 }}>R${props.item.amount.toFixed(2)} - {props.item.customer_name} - {paymentMethod && paymentMethod}</Text>
            </View>

            <View style={styles.deleteButtonsArea}>
              {!props.isLoading ? (
                <TouchableOpacity style={[styles.deleteButton, { backgroundColor: COLORS.Red }]}
                  onPress={() => props.buttonAction(props.item)}
                >

                  <Text style={{ padding: 8, textAlign: 'center', fontFamily: 'MontserratSemiBold', color: '#fff', }}>Confirmar</Text>
                </TouchableOpacity>

              ) : (
                <TouchableOpacity style={[styles.deleteButton, { backgroundColor: COLORS.WhiteBackground, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.GreenSecondary }]}>

                  <ActivityIndicator size="small" color={COLORS.GreenPrimary} />
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.deleteButton, { backgroundColor: COLORS.GrayFont }]}
                onPress={() => props.isLoading ? null : setShowDeleteMode(false)}>
                <Text style={{ padding: 8, textAlign: 'center', fontFamily: 'MontserratSemiBold', color: "#fff" }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ color: COLORS.GrayFont, fontFamily: 'MontserratSemiBold', textAlign: 'center', marginTop: 2 }}>Essa ação não poderá ser desfeita</Text>

          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.trashContainer} onPress={() => setShowDeleteMode(true)}>
              <Ionicons name='trash-outline' size={20} color={COLORS.GrayFont} />
            </TouchableOpacity>

            <View style={styles.amountContainer}>
              <Text style={styles.currencyText}>R$</Text>
              <Text style={styles.amountText}>{props.item.amount.toFixed(2)}</Text>
            </View>

            <View>
              <Text style={styles.customerName}>{customerName}</Text>
            </View>

            {paymentMethod && (
              <Text style={styles.method}>{paymentMethod}</Text>
            )}

            <Text style={styles.date}>{dateToString}</Text>
            <Text style={styles.time}>{time}</Text>
          </>
        )}

      </View>
    )
  }

  return (
    <View style={styles.container} >
      <View style={styles.amountContainer}>
        <Text style={styles.currencyText}>R$</Text>
        <Text style={styles.amountText}>{props.item.amount.toFixed(2)}</Text>
      </View>

      <View>
        <Text style={styles.customerName}>{customerName}</Text>
      </View>

      {paymentMethod && (
        <Text style={styles.method}>{paymentMethod}</Text>
      )}

      <Text style={styles.date}>{dateToString}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    marginTop: 10,
    paddingHorizontal: 20,
    height: 120,
    borderRadius: 20,
    borderColor: COLORS.GreenSecondary,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'

  },
  deleteContainer: {
    flexDirection: 'column',
    position: 'absolute',
    height: 120,
    padding: 10,
    left: 0,
    right: 0
  },
  deleteMessage: {
    color: COLORS.GrayFont, fontFamily: 'MontserratSemiBold'
  },
  deleteButtonsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,
    marginTop: 5
  },
  deleteButton: {
    flex: 1,
    borderRadius: 11,
    elevation: 1
  },
  trashContainer: {
    position: 'absolute',
    right: 15,
    top: 5,
    // backgroundColor: 'red',
    padding: 5
  },
  text: {
    fontSize: 20
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencyText: {
    fontFamily: 'MontserratBold',
    color: COLORS.GreenPrimary
  },
  amountText: {
    fontFamily: 'MontserratBold',
    color: COLORS.GreenPrimary,
    fontSize: 28
  },
  method: {
    position: 'absolute',
    left: 20,
    bottom: 5,
    color: COLORS.GrayFont
  },
  customerName: {
    fontFamily: 'MontserratRegular',
    fontSize: 20,
    textAlign: 'left',
    color: COLORS.GreenPrimary
  },
  time: {
    position: 'absolute',
    bottom: 5,
    right: "50%",
    color: COLORS.GrayFont
  },
  date: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    color: COLORS.GrayFont
  }
})