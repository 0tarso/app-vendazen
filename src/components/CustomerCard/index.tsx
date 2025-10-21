import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomerWithPurchasesAndPayments } from '@/src/schemas/Customer/customer-schema'
import { COLORS } from '@/src/constants/Colors'

interface CustomerCardProps {
  customer: CustomerWithPurchasesAndPayments
  onPress: () => void
}

export default function CustomerCard({ customer, onPress }: CustomerCardProps) {
  return (
    <TouchableOpacity style={styles.container}
      onPress={onPress}
    >
      <View>
        <Text style={styles.name}>{customer.name}</Text>

      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    borderWidth: 2,
    borderColor: COLORS.GreenSecondary,
    borderRadius: 15,
    marginTop: 10,
    padding: 20
  },
  name: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
    color: COLORS.GreenPrimary
  }
})