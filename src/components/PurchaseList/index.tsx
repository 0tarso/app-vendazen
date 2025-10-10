import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { PurchaseSchema } from '@/src/schemas/Purchase/purchase-schema'
import PurchaseCard from '../PurchaseCard'
import { COLORS } from '@/src/constants/Colors'

interface PurchaseListProps {
  purchases: PurchaseSchema[] | null
}

export default function PurchaseList(props: PurchaseListProps) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Últimas vendas</Text>
      {props.purchases &&
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // style={{ backgroundColor: 'red' }}
          data={props.purchases}
          renderItem={({ item }) => <PurchaseCard purchase={item} />}
          keyExtractor={item => item.id.toString()}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20

  },
  text: {
    paddingHorizontal: 20,
    fontSize: 26,
    fontFamily: 'MontserratRegular',
    color: COLORS.GrayFont
  }
})