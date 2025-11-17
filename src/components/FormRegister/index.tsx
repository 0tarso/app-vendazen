import { View, Text, Keyboard, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { registerFinalSchema, RegisterSchema } from '@/src/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthTabParamList } from '@/src/routes/auth.routes';
import Logo from '../Logo';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import { styles } from './styles';
import { useAuth } from '@/src/contexts/AuthContext';
import { nextStep, previousStep } from './actions';
import { useToast } from '@/src/hooks/useToast';

export default function RegisterForm() {

  const { error, success } = useToast()

  const { navigate } = useNavigation<NavigationProp<AuthTabParamList>>()
  const { register, loadingAuth } = useAuth()

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [step, setStep] = useState(1)

  useEffect(() => {
    // Adiciona os ouvintes de eventos ao montar o componente
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    },
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    },
    );

    // Remove os ouvintes de eventos ao desmontar o componente
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [])


  const { reset, control, handleSubmit, trigger, getValues, formState: { errors, } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerFinalSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });


  const handleNextStep = async () => {
    nextStep(step, setStep, trigger, getValues)
  }

  const handlePreviousStep = async () => {
    previousStep(step, setStep, reset, navigate)
  }

  const onSubmit = async (userData: RegisterSchema) => {

    const response = await register(userData)

    if (!response) return error('Erro inesperado ao criar usuário. Tente novamente.', 'Erro inesperado')

    if ('token' in response) {
      success('Olá, bom você por aqui!', 'Bem-vindo(a)!')
    }

    else {
      console.log(response)
      error('Erro ao cadastrar usuário :(', 'Ops, tivemos um erro')
    }
  }


  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 20, height: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.logoContainer}>
          <Logo fontSize={34} />
        </View>

        {step === 1 && (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Vamos começar</Text>
              <Text style={styles.text}>pelo seu nome</Text>
            </View>

            <View style={{ paddingTop: 100 }}>
              <CustomInput
                control={control}
                name="name"
                placeholder='Seu nome'
                isPassword={false}
              />
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Agora,</Text>
              <Text style={styles.text}>seu email</Text>
            </View>

            <View style={{ paddingTop: 100 }}>
              <CustomInput
                control={control}
                name="email"
                placeholder='exemplo@email.com'
                isPassword={false}
              />
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Shh!</Text>
              <Text style={styles.text}>sua senha</Text>
            </View>

            <View style={{ paddingTop: 100 }}>
              <CustomInput
                control={control}
                name="password"
                placeholder='******'
                isPassword={true}
              />
            </View>
          </>
        )}

        {!isKeyboardVisible && (
          <View style={styles.buttonArea}>
            {step === 1 && (
              <View style={styles.buttonContainer}>
                <CustomButton
                  isDisabled={false}
                  label='Próximo'
                  onPress={handleNextStep}
                />
              </View>

            )}

            {step === 2 && (
              <View style={styles.buttonContainer}>
                <CustomButton
                  isDisabled={false}
                  label='Próximo'
                  onPress={handleNextStep}
                />
              </View>

            )}

            {step === 3 && (
              <View style={styles.buttonContainer}>
                <CustomButton
                  isDisabled={false}
                  label='Finalizar'
                  onPress={handleSubmit(onSubmit)}
                  loading={loadingAuth}
                />
              </View>
            )}

            <TouchableOpacity onPress={handlePreviousStep} style={styles.backButtonContainer}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>


        )}
      </ScrollView>

      {isKeyboardVisible && (
        <>
          {step === 1 && (
            <View style={styles.visibleKeyboardButtonContainer}>
              <CustomButton
                isDisabled={false}
                label='Próximo'
                onPress={handleNextStep}
              />
            </View>

          )}

          {step === 2 && (
            <View style={styles.visibleKeyboardButtonContainer}>
              <CustomButton
                isDisabled={false}
                label='Próximo'
                onPress={handleNextStep}
              />
            </View>

          )}

          {step === 3 && (
            <View style={styles.visibleKeyboardButtonContainer}>
              <CustomButton
                isDisabled={false}
                label='Finalizar'
                onPress={handleSubmit(onSubmit)}
                loading={loadingAuth}
              />
            </View>
          )}

        </>
      )}
    </>
  )
}

