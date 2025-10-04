import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";

export type AuthTabParamList = {
  Root: undefined;
  login: undefined;
  register: undefined;
}

const Stack = createStackNavigator<AuthTabParamList>()

export default function AuthRoutes() {
  return (
    <Stack.Navigator >
      <Stack.Screen name='login' component={LoginScreen} options={{
        headerShown: false,
        animation: 'slide_from_left'
      }} />

      <Stack.Screen name='register' component={RegisterScreen} options={{
        headerShown: false,
        animation: 'slide_from_right'
      }} />
    </Stack.Navigator>
  )
}