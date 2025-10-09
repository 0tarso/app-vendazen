import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCustomersAPI } from '@/src/api/get-customers'
import { PurchaseSchema } from '@/src/schemas/Purchase/purchase-schema'
import PurchaseCard from '../PurchaseCard'
import { COLORS } from '@/src/constants/Colors'

export default function PurchaseList() {

  const [purchases, setPurchases] = useState<PurchaseSchema[] | null>(null)

  useEffect(() => {
    const fetch = async () => {

      const data = await getCustomersAPI()

      if (data) {
        const purchases = data
          ?.flatMap((customer) => customer.purchases)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .splice(0, 5)

        setPurchases(purchases)
      }
    }

    fetch()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Últimas vendas</Text>
      {purchases &&
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // style={{ backgroundColor: 'red' }}
          data={purchases}
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