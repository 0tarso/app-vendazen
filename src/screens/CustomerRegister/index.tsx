import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import NavigationHeader from '@/src/components/NavigationHeader'
import FormCustomerRegister from '@/src/components/FormCustomerRegister'
import { useNavigation } from '@react-navigation/native'

export default function CustomerRegister() {
  const { navigate } = useNavigation()

  return (
    <View style={{ flex: 1 }}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ paddingHorizontal: 20 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 140}
      >


        <FormCustomerRegister />
      </KeyboardAvoidingView>

    </View>
  )
}