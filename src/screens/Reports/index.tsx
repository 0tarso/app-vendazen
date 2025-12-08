import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDatePicker from '@/src/components/CustomDatePicker'
import { useCustomer } from '@/src/contexts/CustomerContext'
import { COLORS } from '@/src/constants/Colors';
import { formatPaymentMethodPercentageForPieChart, formatToChartByMonth } from '@/src/utils/transform-data-to-chart';
import CustomChart from '@/src/components/CustomChart';
import { set } from 'zod';


export default function ReportsScreen() {
  const { purchases, payments } = useCustomer()

  const [loading, setLoading] = useState(true)

  const [purchasesChartValues, setPurchasesChartValues] = useState<any>(null)
  const [purchasesMaxValues, setPurchasesMaxValue] = useState(0)

  const [paymentsChartValues, setPaymentsChartValues] = useState<any>(null)
  const [paymentsMaxValues, setPaymentsMaxValue] = useState(0)

  const [paymentsPieChartValues, setPaymentsPieChartValues] = useState<any>(null)

  const [dateToFilterPurchases, setDateToFilterPurchases] = useState<Date>(new Date())
  const [dateToFilterPayments, setDateToFilterPayments] = useState<Date>(new Date())


  useEffect(() => {
    if (!purchases) return;

    const purchasesToChart = formatToChartByMonth(purchases, dateToFilterPurchases.getFullYear());

    setPurchasesChartValues(purchasesToChart);

    const maxValue = Math.max(...purchasesToChart.map(item => Number(item.value) || 0));
    setPurchasesMaxValue(maxValue);

  }, [purchases, dateToFilterPurchases]);


  useEffect(() => {
    if (!payments) return;

    const paymentsToChart = formatToChartByMonth(payments, dateToFilterPayments.getFullYear());

    setPaymentsChartValues(paymentsToChart);

    const maxValue = Math.max(...paymentsToChart.map(item => Number(item.value) || 0));
    setPaymentsMaxValue(maxValue);

  }, [payments, dateToFilterPayments]);

  useEffect(() => {
    if (!payments) return

    const paymentsToPieChart = formatPaymentMethodPercentageForPieChart(payments)
    setPaymentsPieChartValues(paymentsToPieChart)

    console.log(paymentsToPieChart)
    setLoading(false)
  }, [payments])


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={42} color={COLORS.GreenPrimary} />
      </View>
    )
  }

  return (

    <ScrollView showsVerticalScrollIndicator style={{ flex: 1, paddingHorizontal: 10 }}>

      <View style={styles.chartContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Vendas por mês {"(R$)"}</Text>

          <View>
            <CustomDatePicker onChangeDate={(dateString) => setDateToFilterPurchases(new Date(dateString))} select='year' />
          </View>
        </View>

        {purchasesChartValues ? (
          <CustomChart
            data={purchasesChartValues}
            maxValue={purchasesMaxValues}
            type='bar'
          />
        ) : (
          <Text>Sem dados suficientes</Text>
        )}
      </View>


      <View style={styles.chartContainer}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pagamentos por mês {"(R$)"}</Text>

          <View>
            <CustomDatePicker onChangeDate={(dateString) => setDateToFilterPayments(new Date(dateString))} select='year' />
          </View>
        </View>

        {paymentsChartValues ? (
          <CustomChart
            data={paymentsChartValues}
            maxValue={paymentsMaxValues}
            type='bar'
          />
        ) : (
          <Text>Sem dados suficientes</Text>
        )}
      </View>

      <View style={[styles.chartContainer]}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Forma de pagamento {"(%)"}</Text>

          <View>
            <CustomDatePicker onChangeDate={(dateString) => setDateToFilterPayments(new Date(dateString))} select='year' />
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          {paymentsChartValues ? (
            <CustomChart
              data={paymentsPieChartValues}
              maxValue={paymentsMaxValues}
              type='pie'
            />
          ) : (
            <Text>Sem dados suficientes</Text>
          )}
        </View>
      </View>

    </ScrollView>

  )
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: "#ffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary,
    elevation: 2,
    marginVertical: 15,
    paddingVertical: 20,
    overflow: 'hidden'
  },
  titleContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  title: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
    color: COLORS.GrayFont
  }
})