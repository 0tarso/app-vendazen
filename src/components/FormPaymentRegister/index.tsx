import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomModalSelector from '../CustomModalSelector';
import CustomButton from '../CustomButton';
import { COLORS } from '@/src/constants/Colors';
import { androidToast } from '@/src/utils/android-toast';
import CustomInput from '../CustomInput';
import { createPurchaseInput, CreatePurchaseInput } from '@/src/schemas/Purchase/purchase-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootTabParamList } from '@/src/routes/app.routes';
import { useCustomer } from '@/src/contexts/CustomerContext';
import { useForm } from 'react-hook-form';
import { createPaymentSchema, CreatePaymentSchema } from '@/src/schemas/Payment/payment-schema';
import { getCustomerTotalDebt } from '@/src/utils/get-total-customer-debt';

export default function FormPaymentRegister() {
  const { createPayment, loadingCustomerData, fullCustomerData } = useCustomer()
  const { navigate } = useNavigation<NavigationProp<RootTabParamList>>()

  const [customerSelectedId, setCustomerSelectedId] = useState<number | null>(null);
  const [customersList, setCustomersList] = useState<{ key: number; label: string; }[] | null>(null)

  const [customerDebt, setCustomerDebt] = useState<number | null>(null)


  useEffect(() => {
    if (fullCustomerData && !customerSelectedId) {
      const data = fullCustomerData.map((customer, index) => ({
        key: customer.id,
        label: customer.name,
      })) || [];
      setCustomersList(data)
      console.log('Buscando lista de clientes')
      return
    }

    const customer = fullCustomerData?.filter((customerData) => customerData.id === customerSelectedId)[0]

    if (customer) {
      const totalDebtSelectedCustomer = getCustomerTotalDebt(customer)
      console.log('Total divida cliente')
      console.log(totalDebtSelectedCustomer)

      if (totalDebtSelectedCustomer > 0) {
        setCustomerDebt(totalDebtSelectedCustomer)
      }
    }


    return () => {
      setCustomerSelectedId(null)
      reset()
    }
  }, [fullCustomerData, customerSelectedId])




  const { reset, control, handleSubmit } = useForm<CreatePaymentSchema>({
    resolver: zodResolver(createPaymentSchema),
  });

  const onSubmit = async (data: CreatePaymentSchema) => {

    if (customerSelectedId === null) {
      androidToast('Selecione o cliente')
      return;
    }

    if (!customerDebt) {
      androidToast('Cliente não tem dívidas')
      return
    }

    if (data.amount > customerDebt) {
      androidToast(`Cliente deve somente: ${customerDebt.toFixed(2)}`)
      return
    }

    const fullPayment = {
      customerId: customerSelectedId,
      paymentAmount: data.amount
    }

    console.log(fullPayment)

    try {
      await createPayment(customerSelectedId, data.amount)

      androidToast('Pagamento Feito!')

      navigate('customers', { screen: 'customer-list', params: { open: 'customer-list' } })
    } catch (error) {
      console.log('erro')
    }
  };


  return (
    <View style={{ paddingHorizontal: 20 }}>

      <View style={{ paddingTop: 30 }}>

        <Text style={styles.title}>Pagamento</Text>
        <Text style={[styles.title, { marginBottom: 40 }]}>Chegando!</Text>

        <CustomInput
          control={control}
          name="amount"
          placeholder='Ex: 120.25'
          isPassword={false}
          keyboardType='numeric'
        />

      </View>

      <View>
        <CustomModalSelector
          data={customersList ?? []}
          onChange={(key, label) => setCustomerSelectedId(key)}
        />
      </View>


      <>
        <View style={{ marginTop: 120 }}>
          <CustomButton
            isDisabled={false}
            label='Receber'
            onPress={handleSubmit(onSubmit)}
            loading={loadingCustomerData}
          />
        </View>
      </>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {

  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 42,
    color: COLORS.GrayFont
  }
})