import { View, KeyboardAvoidingView, Platform, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { getStyles } from './styles'
import { COLORS } from '@/src/constants/Colors'
import FormLogin from '@/src/components/FormLogin'
import { useTheme } from '@/src/contexts/ThemeContext'
import CustomButton from '@/src/components/CustomButton'

import logoImage from '../../../assets/logoZen.png'


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

        {/* //link para a landingPage do app */}
        <TouchableOpacity style={{ position: 'absolute', left: 20, height: 100, backgroundColor: COLORS.GreenPrimary, justifyContent: 'flex-end', padding: 2, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, overflow: 'hidden', elevation: 2, zIndex: 50 }} activeOpacity={0.9}>

          <Image
            source={logoImage}
            style={{ width: 50, height: 50, opacity: 0.5, borderRadius: 15 }}

          />

        </TouchableOpacity>

        <FormLogin />

      </KeyboardAvoidingView>
    </View>
  )
}