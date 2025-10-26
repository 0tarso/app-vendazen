import { createStackNavigator } from "@react-navigation/stack";
import CustomersScreen from "../screens/Customers";
import CustomerDetails from "../screens/CustomerDetails";
import NavigationHeader from "../components/NavigationHeader";
import CustomerRegister from "../screens/CustomerRegister";
import PurchaseRegister from "../screens/PurchaseRegister";
import PaymentRegister from "../screens/PaymentRegister";


const Stack = createStackNavigator<CustomerStackParamList>()

export type CustomerStackParamList = {
  'customer-list': { open: string, customerId?: number | null };
  'customer-details': { customerId: string };
  'customer-register': undefined;
  'purchase-register': undefined;
  'payment-register': undefined;
};

export default function CustomerStackRoutes() {

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <NavigationHeader title="Teste" />
      }}
      initialRouteName="customer-list"
    >

      <Stack.Screen name="customer-list" component={CustomersScreen} />

      <Stack.Screen name="purchase-register" component={PurchaseRegister} />
      <Stack.Screen name="payment-register" component={PaymentRegister} />

      <Stack.Screen name="customer-details" component={CustomerDetails} />

      <Stack.Screen name="customer-register" component={CustomerRegister} />

    </Stack.Navigator>
  )

}