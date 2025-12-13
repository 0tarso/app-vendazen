import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@/src/contexts/AuthContext'
import { LAYOUT } from '@/src/constants/Layout'
import { useUser } from '@/src/contexts/UserDataContext'
import { COLORS } from '@/src/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles'

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

