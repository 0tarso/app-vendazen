import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserResponse } from "../schemas/User/user-schema";
import { getUserByIdAPI } from "../api/get-user-by-id";
import { useAuth } from "./AuthContext";

interface UserContextType {
  userData: UserResponse | null
  getUserData: () => void
  loadingUser: boolean
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');

  }

  return context
}


export function UserProvider({ children }: { children: ReactNode }) {

  const { userLogged } = useAuth()

  const [userData, setUserData] = useState<UserResponse | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const getUserData = async () => {
    let user = null

    if (!userLogged) return
    setLoadingUser(true)
    try {

      user = await getUserByIdAPI(userLogged.user_id)

      if (user) setUserData(user)

    } catch (error) {
      console.log('Erro ao UserDataContext => ', error)
    } finally {
      setLoadingUser(false)
    }
  }

  useEffect(() => {
    if (userLogged) {
      console.log('UserLogged temos! Vamos buscar dados')
      const fetch = async () => {
        await getUserData()
      }

      fetch()
    }
  }, [userLogged])

  const value: UserContextType = {
    userData,
    getUserData,
    loadingUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}