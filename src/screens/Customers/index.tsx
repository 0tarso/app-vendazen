import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomerList from '@/src/components/CustomerList'

export default function CustomersScreen() {
  return (
    <View style={styles.container}>
      <CustomerList />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#abfaaa'
  }
})