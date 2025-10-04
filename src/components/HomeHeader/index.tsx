import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@/src/contexts/AuthContext'
import { LAYOUT } from '@/src/constants/Layout'
import { useUser } from '@/src/contexts/UserDataContext'

export default function HomeHeader() {

  const { logout } = useAuth()
  const { userData } = useUser()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá, {userData?.name}!</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.text}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ffffff',
    paddingHorizontal: LAYOUT.PADDING_HORIZONTAL,
    paddingTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'MontserratRegular',
    color: "#050505"
  }
})