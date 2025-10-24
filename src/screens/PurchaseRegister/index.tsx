import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import NavigationHeader from '@/src/components/NavigationHeader'
import FormPurchaseRegister from '@/src/components/FormPurchaseRegister'
import { useNavigation } from '@react-navigation/native'

export default function PurchaseRegister() {

  const { navigate } = useNavigation()

  return (
    <View >

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ paddingHorizontal: 20 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >


        <FormPurchaseRegister />
      </KeyboardAvoidingView>


    </View>
  )
}


const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    // flex: 1,
    height: '100%',
    backgroundColor: 'red',

  }
})