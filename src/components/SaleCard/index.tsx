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
    const date = new Date(props.purchase.created_at)
    const convertedDate = new Date(date).toLocaleDateString('pt-BR')

    const time = `${date.getHours()}:${date.getMinutes()}`

    const name = props.purchase.customerName.split(' ', 1)
    const lastName = props.purchase.customerName.split(' ', 2)[1][0].toUpperCase()

    const fullName = `${name} ${lastName}.`
    setTime(time)
    setDateToString(convertedDate)
    setCustomerName(fullName)
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

      <View>
        <Text style={{ textAlign: 'center' }}>{time}</Text>
        <Text>{dateToString}</Text>
      </View>
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
    fontSize: 17
  }
})