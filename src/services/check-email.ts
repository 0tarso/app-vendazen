import api from "../api/api"

export const checkEmailService = async (email: string) => {

  let response = null

  try {
    const { data } = await api.post('/check-email', { email })


    if (data) response = data.statusText

  } catch (error) {
    throw error
  }

  return response

}