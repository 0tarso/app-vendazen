import axios from 'axios'
import Constants from 'expo-constants'
import { RegisterSchema } from '../schemas/registerSchema'
import { AuthUser } from '../contexts/AuthContext'
import { RegisterUserResponseSchema } from '../schemas/User/user-schema'
import { HttpStatusCode } from '../utils/http-status-code'
import { handleAxiosError } from '../utils/handle-axios-error'

// enum ResponseStatus {
//    = 'Email inválido, tente outro por favor.'
// }

export const signUpUserAPI = async (userData: RegisterSchema) => {
  const baseURL = Constants?.expoConfig?.extra?.DEV_BASE_URL_API ?? undefined

  const signUpURL = `${baseURL}/register`

  console.log(signUpURL)

  try {
    const { data, status, statusText } = await axios.post(signUpURL, userData)

    let user: RegisterUserResponseSchema | null = null

    if (data && status === HttpStatusCode.CREATED) {
      console.log('User email register => ', data.content.email)
      console.log('User name register => ', data.content.name)
      console.log('User JWT register => ', data.content.token)


      user = data.content
    }

    return {
      data: user,
      status,
      statusText
    }

  } catch (error) {
    const { message, status, statusText } = handleAxiosError(error)

    console.log(statusText)

    throw { status, statusText, message }
  }
}