import { View, Text, ScrollView, Keyboard, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '../CustomInput'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { COLORS } from '@/src/constants/Colors';
import CustomButton from '../CustomButton';
import { createCustomerSchema, CreateCustomerSchema, customerEditSchema, CustomerEditSchema, CustomerWithPurchasesAndPayments } from '@/src/schemas/Customer/customer-schema';
import { useCustomer } from '@/src/contexts/CustomerContext';
import { useToast } from '@/src/hooks/useToast';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CustomerStackParamList } from '@/src/routes/customerStack.routes';

interface FormEditCustomerProps {
  customer: Pick<CustomerWithPurchasesAndPayments, 'name' | 'cpf' | 'id' | 'phone'>
}

export default function FormEditCustomer(props: FormEditCustomerProps) {
  const { error } = useToast()
  const { loadingEditCustomer, updateCustomer } = useCustomer()

  const { navigate } = useNavigation<NavigationProp<CustomerStackParamList>>()


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

    setValue('name', props.customer.name)
    setValue('cpf', props.customer.cpf ? props.customer.cpf : '')
    setValue('phone', props.customer.phone ? props.customer.phone : '')

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();

      reset()
    };
  }, [])


  const { reset, control, handleSubmit, setValue } = useForm<CustomerEditSchema>({
    resolver: zodResolver(customerEditSchema),
  });

  const onSubmit = async (data: CustomerEditSchema) => {

    console.log(data)

    const verifiedEntries = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    const userUpdate = {
      id: props.customer.id,
      ...verifiedEntries
    }

    const isUpdated = await updateCustomer(userUpdate)

    if (!isUpdated) {
      error('Erro ao atualizar cliente. Tente novamente.', 'Ops, erro!')
      return
    }

    console.log(userUpdate)
    navigate('customer-details', { customerId: props.customer.id.toString() })

  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

        <View style={{ paddingTop: 30 }}>

          <Text style={styles.title}>{props.customer.name}</Text>
          <Text style={styles.subtitle}>Edite os dados abaixo</Text>
          {/* <Text style={[styles.title, { marginBottom: 20 }]}>Novo cliente</Text> */}

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
            <View style={{ marginTop: 110 }}>
              <CustomButton
                isDisabled={false}
                label='Salvar'
                onPress={handleSubmit(onSubmit)}
                loading={loadingEditCustomer}
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
              label='Salvar'
              onPress={handleSubmit(onSubmit)}
              loading={loadingEditCustomer}
            />
          </View>
        </>
      )}
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 42,
    color: COLORS.GrayFont
  },
  subtitle: {
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    color: COLORS.GrayFont,
    marginBottom: 50
  }
})