import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomerList from '@/src/components/CustomerList'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomerStackParamList } from '@/src/routes/customerStack.routes';
import { COLORS } from '@/src/constants/Colors';

export default function CustomersScreen() {
  const navigation = useNavigation<StackNavigationProp<CustomerStackParamList>>()
  const route = useRoute<ReturnType<typeof useRoute>>()

  const [loadingNavigate, setLoadingNavigate] = useState(true)

  useEffect(() => {
    if (route.params?.open === 'purchase-register') {
      navigation.navigate('purchase-register');
      setLoadingNavigate(false)
    }
    if (route.params?.open === 'customer-register') {
      navigation.navigate('customer-register');
      setLoadingNavigate(false)
    }

    if (route.params?.open === 'payment-register') {
      navigation.navigate('payment-register');
      setLoadingNavigate(false)
    }

    setLoadingNavigate(false)
  }, [route.params, route.key]);


  if (loadingNavigate) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={40} color={COLORS.GreenPrimary} />
      </View>
    )
  }

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