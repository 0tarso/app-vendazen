import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import TabItem from '../TabItem'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/src/constants/Colors'
import { ScaleInView } from '../ScaleInView'
import { useNavigation, useRoute } from '@react-navigation/native'
import SpeedDialButton from '../SpeedDialButton'

export default function TabBar(props: BottomTabBarProps) {

  const { state: currentNavigation } = props

  const routesWhereSpeedDialShouldRender = ['home', 'purchases']

  const [showSpeedDialButton, setShowSpeedDialButton] = useState(true)

  useEffect(() => {
    const currentRouteName = currentNavigation.routes[currentNavigation.index].name;

    if (routesWhereSpeedDialShouldRender.includes(currentRouteName)) {
      setShowSpeedDialButton(true)
    } else {
      setShowSpeedDialButton(false)
    }

  }, [currentNavigation.index])



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

      {showSpeedDialButton && (
        <>
          <SpeedDialButton />
        </>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: '#fff',
    paddingBottom: 60,
    paddingTop: 20,
    elevation: 20
  },
})