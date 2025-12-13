import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '@/src/constants/Colors'
import { useCustomer } from '@/src/contexts/CustomerContext'
import { calculateSummary } from './actions'
import { styles } from './styles'

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


      console.log('Cliente em debito', customersWithDebtCount)

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
          <Text style={styles.label}>{customersWithDebt && customersWithDebt <= 1 ? 'Cliente em débito' : 'Clientes em débito'}</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.card}>
          <Text style={styles.value}>{newCustomers}</Text>
          <Text style={styles.label}>{newCustomers && newCustomers <= 1 ? 'Novo cliente' : 'Novos clientes'} {'      (7 dias)'}</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.card}>
          <Text style={styles.value}>{purchasesThisWeek}</Text>
          <Text style={styles.label}>{purchasesThisWeek && purchasesThisWeek <= 1 ? 'Venda' : 'Vendas'} {'             (7 dias)'}</Text>
        </View>

      </View>
    </View>
  )
}


