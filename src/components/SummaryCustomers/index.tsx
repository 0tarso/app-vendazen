import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '@/src/constants/Colors'
import { useCustomer } from '@/src/contexts/CustomerContext'
import { calculateSummary } from './actions'

export default function SummaryCustomers() {

  const { fullCustomerData } = useCustomer()

  const [customersWithDebt, setCustomersWithDebt] = useState<number | null>(null)

  const [newCustomers, setNewCustomers] = useState<number | null>(null)

  const [purchasesThisWeek, setPurchasesThisWeek] = useState<number | null>(null)

  useEffect(() => {

    if (fullCustomerData) {
      const {
        customersWithDebtCount,
        newCustomersThisWeekCount,
        purchasesThisWeekCount } = calculateSummary(fullCustomerData)

      setCustomersWithDebt(customersWithDebtCount);
      setNewCustomers(newCustomersThisWeekCount);
      setPurchasesThisWeek(purchasesThisWeekCount);
    }

  }, [fullCustomerData])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>

      <View style={styles.cardContainer}>


        <View style={styles.card}>
          <Text style={styles.value}>{customersWithDebt}</Text>
          <Text style={styles.label}>Clientes em débito</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.card}>
          <Text style={styles.value}>{newCustomers}</Text>
          <Text style={styles.label}>Novos clientes {'(7 dias)'}</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.card}>
          <Text style={styles.value}>{purchasesThisWeek}</Text>
          <Text style={styles.label}>Vendas {'          (7 dias)'}</Text>
        </View>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 100
  },
  title: {
    fontSize: 24,
    fontFamily: 'MontserratRegular',
    color: COLORS.GrayFont
  },
  cardContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: COLORS.GreenSecondary,
    backgroundColor: '#FFF',
    borderRadius: 15,
    // overflow: 'scroll',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  separator: {
    width: 2,
    backgroundColor: COLORS.GreenSecondary,
    // borderWidth: 0.5,
    // borderColor: COLORS.GreenSecondary,
    height: '100%'
  },
  card: {
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: '',
    width: '33%'
  },
  value: {
    fontFamily: "MontserratSemiBold",
    color: COLORS.GreenPrimary,
    fontSize: 24,
    textAlign: 'center'
  },
  label: {
    paddingHorizontal: 10,
    // width: '80%',
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
    fontSize: 12,
    color: COLORS.GreenPrimary
  }
})