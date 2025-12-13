import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/Colors'

export default function Logo({ fontSize }: { fontSize: number }) {

  return (
    <Text style={[styles.text, { fontSize: fontSize }]}>VendaZen</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#faf'
  },
  text: {
    fontFamily: 'JuliusSansRegular',
    // fontSize: 54,
    // backgroundColor: "#fabc",
    textAlign: 'center',
    color: COLORS.GreenPrimary
  }
})