import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PurchaseSchema } from '@/src/schemas/Purchase/purchase-schema'
import { COLORS } from '@/src/constants/Colors'

interface PurchaseCardProps {
  purchase: PurchaseSchema
}

export default function PurchaseCard({ purchase }: PurchaseCardProps) {

  const [dateToString, setDateToString] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    const date = new Date(purchase.created_at)
    const convertedDate = new Date(date).toLocaleDateString('pt-BR')

    const time = `${date.getHours()}:${date.getMinutes()}`

    setTime(time)
    setDateToString(convertedDate)
  }, [])

  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <Text style={{ color: COLORS.GreenPrimary, fontSize: 12 }}>R$</Text>
        <Text style={styles.purchaseValue}>{purchase.amount.toFixed(2)}</Text>

      </View>
      <Text style={styles.purchaseDate}>{dateToString}</Text>
      <Text style={styles.purchaseTime}>{time}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginLeft: 12,
    marginRight: 6,
    width: 150,
    alignItems: 'center',
    paddingVertical: 20,
    // padding: 25,
    borderRadius: 30,
    borderColor: COLORS.GreenSecondary,
    borderWidth: 2,
    elevation: 5,
    marginBottom: 10
  },
  purchaseValue: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.GreenPrimary

  },
  purchaseDate: {
    marginTop: 5,
    fontFamily: 'MontserratRegular',
    textAlign: 'center',
    color: COLORS.GreenPrimary
  },
  purchaseTime: {
    fontFamily: 'MontserratRegular',
    textAlign: 'center',
    color: COLORS.GreenPrimary
  }

})