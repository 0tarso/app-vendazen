import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomerWithPurchases } from '@/src/schemas/Customer/customer-schema'
import { COLORS } from '@/src/constants/Colors'

interface CustomerCardProps {
  customer: CustomerWithPurchases
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text style={styles.name}>{customer.name}</Text>

      </View>

      {/* <View>
        <Text>{customer.}</Text>
      </View> */}
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