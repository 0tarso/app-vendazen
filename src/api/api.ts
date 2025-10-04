import axios from 'axios'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

const baseURL = Constants?.expoConfig?.extra?.DEV_BASE_URL_API ?? undefined

const api = axios.create({
  baseURL: baseURL
})

api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');

    // console.log(token)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Falha ao obter o token do SecureStore', error);
  }

  return config
})


export default api