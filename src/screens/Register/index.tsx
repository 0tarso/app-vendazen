import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '@/src/components/Logo'
import { COLORS } from '@/src/constants/Colors'
import CustomInput from '@/src/components/CustomInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthSchema, authSchema } from '@/src/schemas/authSchema'
import CustomButton from '@/src/components/CustomButton'
import { registerFinalSchema, RegisterSchema } from '@/src/schemas/registerSchema'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AuthTabParamList } from '@/src/routes/auth.routes'
import RegisterForm from '@/src/components/FormRegister'

export default function RegisterScreen() {


  return (
    <View style={{ backgroundColor: COLORS.WhiteBackground, flex: 1 }}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <RegisterForm />

      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WhiteBackground,
    paddingHorizontal: 20,
    flex: 1,
    // height:'',
    position: 'relative'
  }
})