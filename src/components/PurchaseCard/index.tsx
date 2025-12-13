import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PurchaseSchema } from '@/src/schemas/Purchase/purchase-schema'
import { COLORS } from '@/src/constants/Colors'
import { styles } from './styles'

interface PurchaseCardProps {
  purchase: PurchaseSchema
}

export default function PurchaseCard({ purchase }: PurchaseCardProps) {

  const [dateToString, setDateToString] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    const date = new Date(purchase.created_at)
    const convertedDate = new Date(date).toLocaleDateString('pt-BR')

    const time = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`

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


