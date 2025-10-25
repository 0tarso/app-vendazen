import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import RegisterForm from '@/src/components/FormRegister'

export default function RegisterScreen() {


  return (
    <View style={{ flex: 1 }}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >


        <RegisterForm />

      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'yellow',
    // paddingHorizontal: 10,
    flex: 1,
    // height:'',
    position: 'relative'
  }
})