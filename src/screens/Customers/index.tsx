import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import CustomerList from '@/src/components/CustomerList'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomerStackParamList } from '@/src/routes/customerStack.routes';

export default function CustomersScreen() {
  const navigation = useNavigation<StackNavigationProp<CustomerStackParamList>>()
  const route = useRoute<ReturnType<typeof useRoute>>()


  useEffect(() => {
    if (route.params?.open === 'purchase-register') {
      navigation.navigate('purchase-register');
    }
  }, [route.params]);

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