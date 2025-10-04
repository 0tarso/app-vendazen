import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { COLORS } from '@/src/constants/Colors'
import TabItem from '../TabItem'

export default function TabBar(props: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {props.state.routes.map((route, index) => (
        <TabItem
          key={route.key}
          state={props.state}
          navigation={props.navigation}
          descriptors={props.descriptors}
          index={index}
          route={route}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: '#fff',
    paddingBottom: 60,
    paddingTop: 20,
  }
})