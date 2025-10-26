import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/constants/Colors'
import SalesSummaryCard from '../SalesSummaryCard'


interface SalesSummaryProps {
  salesValue: number
  debtsValue: number
  title: string
}

export default function SummaryCards(props: SalesSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>

      <SalesSummaryCard
        type='sales'
        value={props.salesValue}
      />
      <SalesSummaryCard
        type='debt'
        value={props.debtsValue}
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
    fontSize: 24,
    fontFamily: 'MontserratRegular',
    color: COLORS.GrayFont
  }
})