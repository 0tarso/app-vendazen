import { View, Text, StyleSheet, Keyboard, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '@/src/constants/Colors'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import { createCustomerSchema, CreateCustomerSchema } from '@/src/schemas/Customer/insert-customer-schema';
import { useCustomer } from '@/src/contexts/CustomerContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CustomerListNavigationProp } from '../CustomerList';
import { androidToast } from '@/src/utils/android-toast';
import { CustomerStackParamList } from '@/src/routes/customerStack.routes';
import { useToast } from '@/src/hooks/useToast';

export default function FormCustomerRegister() {

  const { success, error } = useToast()

  const { navigate } = useNavigation<NavigationProp<CustomerStackParamList>>()
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

      reset()
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

    if (!newUser) return error('Erro ao salvar cliente. Tente novamente.')

    success('Novo cliente adicionado com sucesso', 'Cliente cadastrado!')

    navigate('customer-list', { open: 'customer-list' })
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

          {/* <CustomInput
            control={control}
            name="cpf"
            placeholder='CPF (opcional)'
            isPassword={false}
            keyboardType='phone-pad'
          /> */}

        </View>

        {!isKeyboardVisible && (
          <>
            <View style={{ marginTop: 80 }}>
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