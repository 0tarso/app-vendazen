import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/src/constants/Colors'
import { styles } from './styles'

interface CustomerTitleProps {
  name: string
  onPress: () => void

}

export default function CustomerTitle(props: CustomerTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>

      <TouchableOpacity onPress={props.onPress}>
        <Ionicons name='arrow-up-right-box-outline' size={24} color={'#8f8f8f'} />
      </TouchableOpacity>

    </View>
  )
}

