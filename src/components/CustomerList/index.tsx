import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useCustomer } from '@/src/contexts/CustomerContext'
import CustomerCard from '../CustomerCard'

export default function CustomerList() {
  const { customerWithPurchases } = useCustomer()

  useEffect(() => { console.log(customerWithPurchases) })

  return (
    <View style={styles.container}>
      {customerWithPurchases && (
        <FlatList
          data={customerWithPurchases}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CustomerCard customer={item} />}
        />

      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue'
    paddingHorizontal: 15
  },
})