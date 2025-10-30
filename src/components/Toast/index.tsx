import { View, Text, StyleSheet, Animated, TouchableOpacity, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { ToastConfigParams, ToastManagerProps, ToastShowParams } from 'toastify-react-native/utils/interfaces'
import { COLORS } from '@/src/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { styles } from './styles'

type ToastType = 'success' | 'info' | 'error'

interface ToastWithProgressProps extends ToastShowParams {
  type: ToastType
}

const typeStyles = {
  success: {
    border: COLORS.GreenSecondary,
    bar: COLORS.GreenPrimary,
    icon: 'checkmark-outline',
  },
  info: {
    border: '#7bbdff',
    bar: '#2196F3',
    icon: 'information-circle-outline',
  },
  error: {
    border: '#ff9494',
    bar: '#dd4242',
    icon: 'alert-outline',
  },
}

const ToastWithProgress = ({
  text1,
  text2,
  visibilityTime = 5000,
  type,
  hide,
}: ToastWithProgressProps) => {
  const PROGRESS = useRef(new Animated.Value(1)).current
  const SLIDE_ANIMATION = useRef(new Animated.Value(100)).current
  const OPACITY_ANIMATION = useRef(new Animated.Value(0)).current
  const TOAST_THEME_COLORS = typeStyles[type]

  useEffect(() => {
    // Entrada: da direita → centro
    Animated.parallel([
      Animated.timing(SLIDE_ANIMATION, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(OPACITY_ANIMATION, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()

    // Barra de progresso
    Animated.timing(PROGRESS, {
      toValue: 0,
      duration: visibilityTime,
      useNativeDriver: false,
    }).start(() => handleClose()) // fecha ao fim
  }, [])

  const handleClose = () => {
    // Saída: do centro → esquerda
    Animated.parallel([
      Animated.timing(SLIDE_ANIMATION, {
        toValue: -100, // sai para a esquerda
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(OPACITY_ANIMATION, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => hide?.())
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { borderColor: TOAST_THEME_COLORS.border, opacity: OPACITY_ANIMATION, transform: [{ translateX: SLIDE_ANIMATION }] },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconAndTitle}>
          <Ionicons name={TOAST_THEME_COLORS.icon as any} size={26} color={TOAST_THEME_COLORS.bar} />
          <Text style={styles.title}>{text1}</Text>
        </View>

        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close-outline" size={22} color="#555" />
        </TouchableOpacity>
      </View>

      {text2 && <Text style={styles.text}>{text2}</Text>}

      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              backgroundColor: TOAST_THEME_COLORS.bar,
              width: PROGRESS.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </Animated.View>
  )
}

export const toastConfig = {
  success: (props: ToastManagerProps) => <ToastWithProgress {...props} type="success" />,
  info: (props: ToastManagerProps) => <ToastWithProgress {...props} type="info" />,
  error: (props: ToastManagerProps) => <ToastWithProgress {...props} type="error" />,
}

