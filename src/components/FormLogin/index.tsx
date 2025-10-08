import { View, Text, Keyboard, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthTabParamList } from '@/src/routes/auth.routes';
import { useForm } from 'react-hook-form';
import { authSchema, AuthSchema } from '@/src/schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { styles } from './styles';
import Logo from '../Logo';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import { useAuth } from '@/src/contexts/AuthContext';

export default function FormLogin() {
  const { login, loadingAuth } = useAuth()
  const { navigate } = useNavigation<NavigationProp<AuthTabParamList>>()

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


  const { reset, control, handleSubmit } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AuthSchema) => {
    try {
      await login({
        email: data.email,
        password: data.password
      })

    } catch (error) {
      console.log(error)
    }

  };


  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

        <View style={styles.logoContainer}>
          <Logo fontSize={50} />
        </View>

        <View style={{ paddingTop: 60 }}>
          <CustomInput
            control={control}
            name="email"
            placeholder='Email'
            isPassword={false}
          />

          <CustomInput
            control={control}
            name="password"
            placeholder='Senha'
            isPassword={true}
          />

        </View>

        {!isKeyboardVisible && (
          <>
            <View style={{ marginTop: 60 }}>
              <CustomButton
                isDisabled={false}
                label='Entrar'
                onPress={handleSubmit(onSubmit)}
              />
            </View>

            <View>
              <Text style={styles.createAccountText}>Ainda não tem uma conta?</Text>

              <TouchableOpacity onPress={() => navigate('register')}>
                <Text style={styles.createAccountLink}>Criar conta</Text>
              </TouchableOpacity>
            </View>
          </>

        )}
      </ScrollView>

      {isKeyboardVisible && (
        <>
          <View>
            <CustomButton
              isDisabled={false}
              label='Entrar'
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </>
      )}
    </>
  )
}