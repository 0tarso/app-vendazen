import { createStackNavigator } from "@react-navigation/stack";
import CustomersScreen from "../screens/Customers";
import CustomerDetails from "../screens/CustomerDetails";
import NavigationHeader from "../components/NavigationHeader";
import CustomerRegister from "../screens/CustomerRegister";
import PurchaseRegister from "../screens/PurchaseRegister";


const Stack = createStackNavigator<CustomerStackParamList>()

export type CustomerStackParamList = {
  'customer-list': { open: string };
  'customer-details': { customerId: string };
  'customer-register': undefined;
  'purchase-register': undefined
};

export default function CustomerStackRoutes() {

  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false

        header: () => <NavigationHeader title="Teste" />
      }}
      initialRouteName="customer-list"
    >

      <Stack.Screen name="customer-list" component={CustomersScreen}
      // options={{
      //   header: () => <NavigationHeader title='Clientes' />
      // }}
      />

      <Stack.Screen name="purchase-register" component={PurchaseRegister}
      // options={{
      //   // header: () => <NavigationHeader title='Registrar Venda' />
      // }}
      />
      <Stack.Screen name="customer-details" component={CustomerDetails}
        options={{
          title: 'Cliente'
        }}
      />

      <Stack.Screen name="customer-register" component={CustomerRegister}
      // options={{
      //   headerShown: false,

      // }}
      />


    </Stack.Navigator>
  )

}