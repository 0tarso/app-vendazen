import React from "react";
import { UseFormReset, UseFormTrigger } from "react-hook-form";
import { RegisterSchema } from "@/src/schemas/registerSchema";



export const nextStep = async (
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  trigger: UseFormTrigger<RegisterSchema>,
) => {
  let isValid = false

  if (step === 1) isValid = await trigger('name')
  if (step === 2) isValid = await trigger('email')
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