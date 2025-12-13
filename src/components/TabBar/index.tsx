import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import TabItem from '../TabItem'

import SpeedDialButton from '../SpeedDialButton'
import { styles } from './styles'

export default function TabBar(props: BottomTabBarProps) {

  const { state: currentNavigation } = props

  const routesWhereSpeedDialShouldRender = ['home', 'purchases', 'payments']

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

