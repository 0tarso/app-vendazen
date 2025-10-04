import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import HomeHeader from '@/src/components/HomeHeader'

export default function HomeScreen() {


  return (
    <View style={styles.container}>
      <HomeHeader />
    </View>
  )
}