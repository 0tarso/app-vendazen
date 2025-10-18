import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import NavigationHeader from '@/src/components/NavigationHeader'
import FormCustomerRegister from '@/src/components/FormCustomerRegister'

export default function CustomerRegister() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader
        title='Adicionar Cliente'
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ paddingHorizontal: 20 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >


        <FormCustomerRegister />
      </KeyboardAvoidingView>

    </View>
  )
}