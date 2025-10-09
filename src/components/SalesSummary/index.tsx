import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/constants/Colors'
import SalesSummaryCard from '../SalesSummaryCard'

export default function SalesSummary() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resumo Mensal</Text>

      <SalesSummaryCard
        type='sales'
        value='152.20'
      />
      <SalesSummaryCard
        type='debt'
        value='40.20'
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
    // backgroundColor: 'red'
  },
  text: {
    // paddingHorizontal: 20,
    fontSize: 26,
    fontFamily: 'MontserratRegular',
    color: COLORS.GrayFont
  }
})