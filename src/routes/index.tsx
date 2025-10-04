import { NavigationContainer } from "@react-navigation/native"
import TabsRoutes from "./app.routes"
import AuthRoutes from "./auth.routes"
import { useAuth } from "../contexts/AuthContext"

export const Routes = () => {

  const { userLogged, loadingAuth } = useAuth()

  return (
    <NavigationContainer>
      {userLogged ? <TabsRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}