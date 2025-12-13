import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomerWithPurchasesAndPayments } from '@/src/schemas/Customer/customer-schema'
import { COLORS } from '@/src/constants/Colors'
import { getTotalSales } from '@/src/utils/get-total-sales'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles'

interface CustomerCardProps {
  customer: CustomerWithPurchasesAndPayments
  onPress: () => void
}

export default function CustomerCard({ customer, onPress }: CustomerCardProps) {
  return (
    <TouchableOpacity style={styles.buttonCard}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Text style={styles.name}>{customer.name}</Text>

        <Ionicons name='chevron-forward' size={14} color={COLORS.GreenPrimary} />
      </View>

    </TouchableOpacity>
  )
}

