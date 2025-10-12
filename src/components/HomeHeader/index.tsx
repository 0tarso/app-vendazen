import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@/src/contexts/AuthContext'
import { LAYOUT } from '@/src/constants/Layout'
import { useUser } from '@/src/contexts/UserDataContext'
import { COLORS } from '@/src/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function HomeHeader() {

  const { logout, loadingAuth } = useAuth()
  const { userData, loadingUser } = useUser()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <View style={styles.container}>

      <View style={styles.avatarArea}>
        <View style={styles.avatarContainer}>

          {loadingUser ? (
            <ActivityIndicator size={18} color="#ffff" />
          ) : (
            <Ionicons name='person-outline' size={18} color={"#ffff"} />

          )}

        </View>

        {!loadingUser && userData && (
          <Text style={styles.text}>Olá, {userData.name}!</Text>
        )}

      </View>

      <TouchableOpacity onPress={handleLogout}>
        {/* <Text style={styles.text}>Sair</Text> */}
        <Ionicons name='settings-outline' size={20} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: LAYOUT.PADDING_HORIZONTAL,
    paddingTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 20,
    elevation: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary
  },
  text: {
    fontSize: 16,
    fontFamily: 'MontserratRegular',
    color: "#050505"
  },
  avatarArea: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  avatarContainer: {
    backgroundColor: "green",
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary,
    elevation: 5
  },
  avatarText: {
    fontFamily: 'MontserratBold',
    color: COLORS.WhiteFont
  }
})