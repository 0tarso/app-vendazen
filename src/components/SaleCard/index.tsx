import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PurchaseWithCustomer } from '@/src/schemas/Purchase/purchase-schema'
import { COLORS } from '@/src/constants/Colors'


interface SaleCardProps {
  purchase: PurchaseWithCustomer
}

export default function SaleCard(props: SaleCardProps) {
  const [dateToString, setDateToString] = useState('')
  const [time, setTime] = useState('')
  const [customerName, setCustomerName] = useState('')

  useEffect(() => {
    if (props.purchase) {
      console.log(props.purchase)
      const date = new Date(props.purchase.created_at)
      const convertedDate = new Date(date).toLocaleDateString('pt-BR')

      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const time = `${hours}:${minutes}`

      const nameParts = props.purchase.customer_name.split(' ');
      const name = nameParts[0];
      const lastNameInitial = nameParts.length > 1 ? nameParts[1][0].toUpperCase() : null;

      const fullName = `${name} ${lastNameInitial ? lastNameInitial + '.' : ''}`
      setTime(time)
      setDateToString(convertedDate)
      setCustomerName(fullName)
    }

  }, [])

  return (
    <View style={styles.container} >
      <View style={styles.amountContainer}>
        <Text style={styles.currencyText}>R$</Text>
        <Text style={styles.amountText}>{props.purchase.amount.toFixed(2)}</Text>
      </View>

      <View>
        <Text style={styles.customerName}>{customerName}</Text>
      </View>

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
  customerName: {
    fontFamily: 'MontserratRegular',
    fontSize: 20,
    textAlign: 'left',
    color: COLORS.GreenPrimary
  },
  time: {
    position: 'absolute',
    bottom: 5,
    left: 20,
    color: COLORS.GrayFont
  },
  date: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    color: COLORS.GrayFont
  }
})