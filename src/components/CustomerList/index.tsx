import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useCustomer } from '@/src/contexts/CustomerContext'
import CustomerCard from '../CustomerCard'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomerStackParamList } from '@/src/routes/customerStack.routes'
import { COLORS } from '@/src/constants/Colors'


export type CustomerListNavigationProp = StackNavigationProp<
  CustomerStackParamList,
  'customer-list'
>;

export default function CustomerList() {
  const navigation = useNavigation<CustomerListNavigationProp>()
  const { fullCustomerData } = useCustomer()

  useEffect(() => { console.log("Total de cliente => ", fullCustomerData?.length) })

  const handleNavigate = (customerId: string) => {
    console.log(customerId)
    navigation.navigate('customer-details', { customerId })
  }

  return (
    <View style={styles.container}>
      {fullCustomerData && fullCustomerData.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={fullCustomerData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CustomerCard
              customer={item}
              onPress={() => handleNavigate(item.id.toString())}
            />
          )}
        />

      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            fontFamily: 'MontserratSemiBold',
            fontSize: 16,
            color: COLORS.GrayFont,
            textAlign: 'center',
            paddingVertical: 20
          }}>Você ainda não possui clientes</Text>
        </View>
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