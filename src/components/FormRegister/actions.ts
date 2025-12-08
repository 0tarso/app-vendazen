import React from "react";
import { UseFormGetValues, UseFormReset, UseFormTrigger } from "react-hook-form";
import { RegisterSchema } from "@/src/schemas/registerSchema";
import api from "@/src/api/api";
import { email } from "zod";
import { handleAxiosError } from "@/src/utils/handle-axios-error";
import { androidToast } from "@/src/utils/android-toast";
import { Toast } from "toastify-react-native";
import { checkEmailService } from "../../services/user/check-email";



export const nextStep = async (
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  trigger: UseFormTrigger<RegisterSchema>,
  field: UseFormGetValues<RegisterSchema>
) => {

  let isValid = false

  if (step === 1) isValid = await trigger('name')


  if (step === 2) {
    isValid = await trigger('email')

    if (!isValid) return

    console.log("Log em actions ===============")
    console.log(field('email'))

    const newUserEmail = { email: field('email') }

    try {
      const response = await checkEmailService(newUserEmail.email)

      console.log(response.data)

    } catch (error) {
      const handled = handleAxiosError(error)
      console.log(handled)

      Toast.show({
        type: 'info',
        text1: 'Ops!',
        text2: `${handled.data.message}`,
      })

      isValid = false
    }
  }


  if (step === 3) isValid = await trigger('password')

  if (isValid && step < 3) {
    setStep(step + 1);
  }
}


export const previousStep = (
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  reset: UseFormReset<RegisterSchema>,
  navigate: (screen: string) => void
) => {

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


