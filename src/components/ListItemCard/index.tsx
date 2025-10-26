import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PurchaseWithCustomer } from '@/src/schemas/Purchase/purchase-schema'
import { COLORS } from '@/src/constants/Colors'
import { PaymentWithCustomerName } from '@/src/schemas/Payment/payment-schema'


interface ListItemCardProps {
  item: PurchaseWithCustomer | PaymentWithCustomerName
}

export enum PaymentMethod {
  'PIX' = 'Pix',
  'DEBIT CARD' = 'Débito',
  'CREDIT CARD' = 'Crédito',
  'CASH' = 'Dinheiro'

}

export default function ListItemCard(props: ListItemCardProps) {
  const [dateToString, setDateToString] = useState('')
  const [time, setTime] = useState('')
  const [customerName, setCustomerName] = useState('')

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
        if (method) setPaymentMethod(PaymentMethod[method as keyof typeof PaymentMethod])
      }

      setTime(time)
      setDateToString(convertedDate)
      setCustomerName(fullName)
    }

  }, [])

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
    height: 100,
    borderRadius: 20,
    borderColor: COLORS.GreenSecondary,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'

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