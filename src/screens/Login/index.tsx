import { View, KeyboardAvoidingView, Platform, } from 'react-native'
import React from 'react'
import { getStyles } from './styles'
import { COLORS } from '@/src/constants/Colors'
import FormLogin from '@/src/components/FormLogin'
import { useTheme } from '@/src/contexts/ThemeContext'
import CustomButton from '@/src/components/CustomButton'

export default function LoginScreen() {

  const { colors, toggleTheme } = useTheme()

  const styles = getStyles(colors)

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