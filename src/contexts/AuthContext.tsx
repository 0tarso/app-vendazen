import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthSchema } from '../schemas/authSchema';
import { authUserAPI } from '../services/user/authUser';
import { RegisterSchema } from '../schemas/registerSchema';
import { signUpUserAPI } from '../services/user/sign-up-user';
import { RegisterUserResponseSchema, UserByEmailResponseSchema } from '../schemas/User/user-schema';
import { handleAxiosError, NormalizedAxiosError } from '../utils/handle-axios-error';

interface UserDataLogin {
  password: string;
  email: string;
}

export interface AuthUser {
  email: string;
  user_id: string;
  token: string
}

interface AuthContextType {
  userLogged: AuthUser | null;
  userLogin: UserDataLogin | null;
  loadingAuth: boolean;
  login: (userData: UserDataLogin) => Promise<AuthUser | NormalizedAxiosError | null>;
  logout: () => Promise<void>;
  register: (userData: RegisterSchema) => Promise<RegisterUserResponseSchema | NormalizedAxiosError | null>;
}

// 3. Cria o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 4. Provedor do contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [userLogged, setUserLogged] = useState<AuthUser | null>(null)
  const [userLogin, setUserLogin] = useState<UserDataLogin | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  // Função para salvar dados de forma assíncrona
  const saveUserToken = async (userToken: string) => {
    try {
      await SecureStore.setItemAsync('userToken', userToken);
    } catch (error) {
      console.error('Failed to save user token data securely.', error);
    }
  };

  // Função para remover dados
  const removeUserToken = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
    } catch (error) {
      console.error('Failed to remove user token data securely.', error);
    }
  };

  // Lógica de login
  const login = async (userData: AuthSchema) => {
    setLoadingAuth(true)
    console.log('loginnnnn')
    let loginResponse: AuthUser | NormalizedAxiosError | null = null

    // setUser(userData);
    try {
      // await saveUserData(userData)
      const user = await authUserAPI(userData);

      if (user) {
        await saveUserToken(user.token)

        setUserLogged(user)

        loginResponse = user
      }

    } catch (error) {
      const handledError = handleAxiosError(error)

      loginResponse = handledError

    }
    finally {
      setLoadingAuth(false)
    }


    console.log(loginResponse)
    return loginResponse
  };

  // Lógica de logout
  const logout = async () => {
    setUserLogged(null);
    setUserLogin(null)

    await removeUserToken();
  };

  const register = async (userData: RegisterSchema): Promise<RegisterUserResponseSchema | null | NormalizedAxiosError> => {
    setLoadingAuth(true)

    let registerResponse:
      RegisterUserResponseSchema | null | NormalizedAxiosError = null

    try {
      const response = await signUpUserAPI(userData)

      if (response.data) {
        await saveUserToken(response.data?.token)
        setUserLogged(response.data)
        registerResponse = response.data
      }

    } catch (error: any) {
      console.log('Erro ao registrar => ', error)

      const handledError = handleAxiosError(error)

      registerResponse = handledError

    } finally {
      setLoadingAuth(false)
    }

    return registerResponse
  }

  // Verificação de login ao carregar a aplicação
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const storedUser = await SecureStore.getItemAsync('user');
  //       if (storedUser) {
  //         const parsedUser: UserDataLogin = JSON.parse(storedUser);
  //         setUserLogin(parsedUser);
  //       }
  //     } catch (error) {
  //       console.error('Failed to load user data securely.', error);
  //       await removeUserToken(); // Limpa dados corrompidos, se houver
  //     } finally {
  //       setLoadingAuth(false);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  const value: AuthContextType = {
    userLogin,
    loadingAuth,
    login,
    logout,
    userLogged,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}