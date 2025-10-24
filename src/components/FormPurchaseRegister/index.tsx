import { View, Text, StyleSheet, Keyboard, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '@/src/constants/Colors'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import { useCustomer } from '@/src/contexts/CustomerContext';
import { createPurchaseInput, CreatePurchaseInput, createPurchaseSchema, CreatePurchaseSchema } from '@/src/schemas/Purchase/purchase-schema';
import CustomModalSelector from '../CustomModalSelector';
import { androidToast } from '@/src/utils/android-toast';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootTabParamList } from '@/src/routes/app.routes';

export default function FormPurchaseRegister() {

  const { createPurchase, loadingCustomerData, fullCustomerData } = useCustomer()
  const { navigate } = useNavigation<NavigationProp<RootTabParamList>>()

  const [customerSelectedId, setCustomerSelectedId] = useState<number | null>(null);
  const [customersList, setCustomersList] = useState<{ key: number; label: string; }[] | null>(null)


  useEffect(() => {

    if (fullCustomerData) {
      const data = fullCustomerData.map((customer, index) => ({
        key: customer.id,
        label: customer.name,
      })) || [];
      setCustomersList(data)
    }

  }, [fullCustomerData])


  const { reset, control, handleSubmit } = useForm<CreatePurchaseInput>({
    resolver: zodResolver(createPurchaseInput),
  });

  const onSubmit = async (data: CreatePurchaseInput) => {

    if (customerSelectedId === null) {
      alert('Selecione o cliente')
      return;
    }

    const fullPurchase = { ...data, customer_id: customerSelectedId }
    console.log(fullPurchase)

    try {
      await createPurchase(fullPurchase)

      androidToast('Compra Adicionada!')

      navigate('purchases')
    } catch (error) {
      console.log('erro')
    }
  };


  return (
    <>

      <View style={{ paddingTop: 30 }}>

        <Text style={styles.title}>Opa!</Text>
        <Text style={[styles.title, { marginBottom: 40 }]}>Vamos vender!</Text>

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
            label='Vender'
            onPress={handleSubmit(onSubmit)}
            loading={loadingCustomerData}
          />
        </View>
      </>
    </>
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