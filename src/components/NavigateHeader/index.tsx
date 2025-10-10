import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/src/constants/Colors'
import { useNavigation, useRoute } from '@react-navigation/native'

interface NavigateHeaderProps {
  title: string
}

export default function NavigateHeader(props: NavigateHeaderProps) {
  const { navigate, goBack, } = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity hitSlop={10}
        onPress={() => goBack()}
      >
        <Ionicons name='arrow-back-outline' size={20} color={COLORS.GreenPrimary} />

      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary
  },
  title: {
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    marginLeft: 10,
  },

})