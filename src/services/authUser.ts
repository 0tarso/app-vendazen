import axios, { AxiosError, AxiosResponse } from 'axios'
import { AuthSchema } from '../schemas/authSchema'
import Constants from 'expo-constants'
import { HttpStatusCode } from '../utils/http-status-code'
import { AuthUser } from '../contexts/AuthContext'

export const authUserAPI = async (userData: AuthSchema) => {

  const baseURL = Constants?.expoConfig?.extra?.DEV_BASE_URL_API ?? undefined
  console.log(baseURL)
  console.log(userData)

  const authURL = `${baseURL}/login`
  console.log(authURL)

  let userLoginResponse: AuthUser | null = null

  try {
    const { data, status } = await axios.post(authURL, userData)

    if (data && status === HttpStatusCode.OK) {
      console.log('User email => ', data.content.email)
      console.log('User id => ', data.content.user_id)
      console.log('JWT token => ', data.content.token)

      userLoginResponse = data.content

    }

  } catch (error) {
    throw error
  }

  return userLoginResponse
}