import { View, KeyboardAvoidingView, Platform, } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { COLORS } from '@/src/constants/Colors'
import FormLogin from '@/src/components/FormLogin'

export default function LoginScreen() {

  return (
    <View style={{ backgroundColor: COLORS.WhiteBackground, flex: 1 }}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >

        <FormLogin />

      </KeyboardAvoidingView>
    </View>
  )
}