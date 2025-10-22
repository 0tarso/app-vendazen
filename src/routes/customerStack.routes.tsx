import { createStackNavigator } from "@react-navigation/stack";
import CustomersScreen from "../screens/Customers";
import CustomerDetails from "../screens/CustomerDetails";
import NavigationHeader from "../components/NavigationHeader";
import CustomerRegister from "../screens/CustomerRegister";


const Stack = createStackNavigator<CustomerStackParamList>()

export type CustomerStackParamList = {
  'customer-list': undefined;
  'customer-details': { customerId: string };
  'customer-register': undefined
};

export default function CustomerStackRoutes() {

  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false
      }}
    >

      <Stack.Screen name="customer-list" component={CustomersScreen}
        options={{
          header: () => <NavigationHeader title='Clientes' />
        }}
      />

      <Stack.Screen name="customer-details" component={CustomerDetails}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen name="customer-register" component={CustomerRegister}
        options={{
          headerShown: false,

        }}
      />


    </Stack.Navigator>
  )

}