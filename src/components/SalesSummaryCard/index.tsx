import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles'

interface SalesSummaryCardProps {
  type: 'sales' | 'debt'
  value: number
}

export default function SalesSummaryCard(props: SalesSummaryCardProps) {


  return (
    <View style={styles.container}>

      <Text style={styles.title}>{props.type === 'sales' ? 'Vendas' : 'Em débito'}</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.currency}>R$ </Text>
          <Text style={styles.value}>{props.value.toFixed(2)}</Text>

        </View>

        {props.type === 'debt' ?
          (<Ionicons name='alert-circle-sharp' size={38} color={COLORS.Red} />)
          :
          (<Ionicons name='arrow-up-circle-sharp' size={38} color={COLORS.GreenPrimary} />)
        }

      </View>

    </View>
  )
}

