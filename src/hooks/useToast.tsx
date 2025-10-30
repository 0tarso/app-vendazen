import { useCallback } from 'react'
import { Toast } from 'toastify-react-native'

type ToastType = 'success' | 'info' | 'error'

interface ShowToastParams {
  type?: ToastType
  title?: string
  message?: string
  duration?: number
}

export function useToast() {
  const show = useCallback(
    ({ type = 'info', title, message, duration = 5200 }: ShowToastParams) => {
      Toast.show({
        type,
        text1: title,
        text2: message,
        visibilityTime: duration,
        position: 'top',
      })
    },
    []
  )

  const success = useCallback(
    (message: string, title = 'Sucesso') => {
      show({ type: 'success', title, message })
    },
    [show]
  )

  const info = useCallback(
    (message: string, title = 'Informação') => {
      show({ type: 'info', title, message })
    },
    [show]
  )

  const error = useCallback(
    (message: string, title = 'Erro') => {
      show({ type: 'error', title, message })
    },
    [show]
  )

  return { show, success, info, error }
}
