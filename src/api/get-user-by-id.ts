import { HttpStatusCode } from "axios"
import api from "./api"
import { UserResponse } from "../schemas/User/user-schema"

export const getUserByIdAPI = async (user_id: string) => {

  let user: UserResponse | null = null

  try {
    const { data, status } = await api.get(`/users/${user_id}`)

    if (data && status === HttpStatusCode.Ok) {
      let userData = data.content

      user = {
        email: userData.email,
        birthday: userData.birthday,
        created_at: userData.created_at,
        name: userData.name,
        updated_at: userData.updated_at,
        user_id: userData.user_id
      }
    }

  } catch (error) {
    console.log("Erro em getUserByIdAPI => ", error)
    return null
  }

  return user
}