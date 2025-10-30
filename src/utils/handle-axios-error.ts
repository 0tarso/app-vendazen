import axios, { AxiosError } from 'axios'

export interface NormalizedAxiosError {
  status?: number
  statusText?: string
  message: string
  data?: any
  url?: string
  method?: string
  timestamp: string
}

export const handleAxiosError = (error: unknown): NormalizedAxiosError => {
  if (axios.isAxiosError(error)) {
    const { response, config, message } = error

    const normalizedError: NormalizedAxiosError = {
      status: response?.status,
      statusText: response?.statusText,
      message:
        response?.data?.message ||
        message ||
        'Ocorreu um erro inesperado ao se comunicar com o servidor.',
      data: response?.data,
      url: config?.url,
      method: config?.method?.toUpperCase(),
      timestamp: new Date().toISOString(),
    }

    console.groupCollapsed(
      `%cAxios Error: ${normalizedError.status ?? '???'} ${normalizedError.statusText ?? ''}`,
      'color: red; font-weight: bold;'
    )
    console.log('📄 URL:', normalizedError.url)
    console.log('🔹 Método:', normalizedError.method)
    console.log('💬 Mensagem:', normalizedError.message)
    console.log('📦 Dados:', normalizedError.data)
    console.log('⏰ Hora:', normalizedError.timestamp)
    console.groupEnd()

    return normalizedError
  }

  console.error('Erro não relacionado ao Axios:', error)

  return {
    message: 'Erro inesperado',
    timestamp: new Date().toISOString(),
  }
}