import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { PurchaseSchema } from '@/src/schemas/Purchase/purchase-schema'
import PurchaseCard from '../PurchaseCard'
import { COLORS } from '@/src/constants/Colors'
import { LAYOUT } from '@/src/constants/Layout'
import { styles } from './styles'

interface PurchaseListProps {
  purchases: PurchaseSchema[] | null
}

export default function LastPurchaseList(props: PurchaseListProps) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Últimas vendas</Text>

      {props.purchases && props.purchases?.length > 0 ? (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // style={{ backgroundColor: 'red' }}
          data={props.purchases}
          renderItem={({ item }) => <PurchaseCard purchase={item} />}
          keyExtractor={item => item.id.toString()}
        />

      ) : (
        <View style={styles.emptyPurchaseListContainer}>
          <Text style={styles.emptyPurchaseText}>Ainda sem vendas</Text>
        </View>
      )}

    </View>
  )
}

