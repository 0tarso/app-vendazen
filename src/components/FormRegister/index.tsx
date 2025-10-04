import { View, Text, Keyboard, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { registerFinalSchema, RegisterSchema } from '@/src/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthTabParamList } from '@/src/routes/auth.routes';
import Logo from '../Logo';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import { COLORS } from '@/src/constants/Colors';
import { styles } from './styles';

export default function RegisterForm() {

  const { navigate } = useNavigation<NavigationProp<AuthTabParamList>>()

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [step, setStep] = useState(1)

  useEffect(() => {
    // Adiciona os ouvintes de eventos ao montar o componente
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // O teclado está visível
    },
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // O teclado está escondido
    },
    );

    // Remove os ouvintes de eventos ao desmontar o componente
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [])


  const { reset, control, handleSubmit, trigger, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerFinalSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleNextStep = async () => {
    let isValid = false

    if (step === 1) isValid = await trigger('name')
    if (step === 2) isValid = await trigger('email')
    if (step === 3) isValid = await trigger('password')

    if (isValid) {
      if (step < 3) setStep(step + 1)
    }
  }

  const handlePreviousStep = async () => {
    if (step === 3) {
      setStep(2)
      reset({ password: '' })
    }
    if (step === 2) {
      setStep(1)
      reset({ email: '', password: '' })
    }

    if (step === 1) {
      navigate('login')
      reset()
    }
  }

  const onSubmit = (data: RegisterSchema) => {
    Alert.alert('Dados do Formulário', JSON.stringify(data));
    reset()
    setStep(1)
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ height: '100%', position: 'relative' }}>

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
            <View>
              <CustomButton
                isDisabled={false}
                label='Próximo'
                onPress={handleNextStep}
              />
            </View>

          )}

          {step === 2 && (
            <View>
              <CustomButton
                isDisabled={false}
                label='Próximo'
                onPress={handleNextStep}
              />
            </View>

          )}

          {step === 3 && (
            <View>
              <CustomButton
                isDisabled={false}
                label='Finalizar'
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          )}

        </>
      )}
    </>
  )
}

