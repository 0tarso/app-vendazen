import { View, Text, StyleSheet, Keyboard, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '@/src/constants/Colors'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import { createCustomerSchema, CreateCustomerSchema } from '@/src/schemas/Customer/insert-customer-schema';
import { useCustomer } from '@/src/contexts/CustomerContext';
import { useNavigation } from '@react-navigation/native';
import { CustomerListNavigationProp } from '../CustomerList';

export default function FormCustomerRegister() {

  const { navigate } = useNavigation<CustomerListNavigationProp>()
  const { createCustomer, loadingCustomerData } = useCustomer()

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    },
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [])


  const { reset, control, handleSubmit } = useForm<CreateCustomerSchema>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: '',
      cpf: '',
      phone: ''
    },
  });

  const onSubmit = async (data: CreateCustomerSchema) => {

    const newUser = await createCustomer(data)

    if (newUser) {
      navigate('customer-details', { customerId: newUser.id.toString() })
    }
  };


  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

        <View style={{ paddingTop: 30 }}>

          <Text style={styles.title}>Opa!</Text>
          <Text style={[styles.title, { marginBottom: 20 }]}>Novo cliente</Text>

          <CustomInput
            control={control}
            name="name"
            placeholder='Nome'
            isPassword={false}
          />

          <CustomInput
            control={control}
            name="phone"
            placeholder='Telefone (opcional)'
            isPassword={false}
            keyboardType='phone-pad'
          />

          <CustomInput
            control={control}
            name="cpf"
            placeholder='CPF (opcional)'
            isPassword={false}
            keyboardType='phone-pad'
          />

        </View>

        {!isKeyboardVisible && (
          <>
            <View style={{ marginTop: 40 }}>
              <CustomButton
                isDisabled={false}
                label='Adicionar'
                onPress={handleSubmit(onSubmit)}
                loading={loadingCustomerData}
              />
            </View>
          </>

        )}
      </ScrollView>

      {isKeyboardVisible && (
        <>
          <View>
            <CustomButton
              isDisabled={false}
              label='Adicionar'
              onPress={handleSubmit(onSubmit)}
              loading={loadingCustomerData}
            />
          </View>
        </>
      )}
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