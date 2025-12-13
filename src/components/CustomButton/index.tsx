import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/constants/Colors'
import { styles } from './styles'

interface CustomButtonProps {
  onPress: () => void
  label: string
  isDisabled: boolean
  loading?: boolean
}

export default function CustomButton({ onPress, loading, label, isDisabled }: CustomButtonProps) {

  // const { loadingAuth: loading } = useAuth()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress} disabled={isDisabled}>

        {loading ? (
          <ActivityIndicator size={32} color={"#ffffff"} style={{ paddingVertical: 10 }} />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}

      </TouchableOpacity>
    </View>
  )
}
