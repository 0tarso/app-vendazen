import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useCustomer } from '@/src/contexts/CustomerContext'
import CustomerCard from '../CustomerCard'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomerStackParamList } from '@/src/routes/customerStack.routes'


type CustomerListNavigationProp = StackNavigationProp<
  CustomerStackParamList,
  'customer-list'
>;

export default function CustomerList() {
  const navigation = useNavigation<CustomerListNavigationProp>()
  const { customerWithPurchases } = useCustomer()

  useEffect(() => { console.log(customerWithPurchases) })

  const handleNavigate = (customerId: string) => {
    console.log(customerId)
    navigation.navigate('customer-details', { customerId })
  }

  return (
    <View style={styles.container}>
      {customerWithPurchases && (
        <FlatList
          data={customerWithPurchases}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CustomerCard
              customer={item}
              onPress={() => handleNavigate(item.id.toString())}
            />
          )}
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