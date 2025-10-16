import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home';
import PurchasesScreen from '../screens/Purchases';
import CustomersScreen from '../screens/Customers';
import TabBar from '../components/TabBar';
import NavigationHeader from '../components/NavigationHeader';
import CustomerStackRoutes from './customerStack.routes';

export type RootTabParamList = {
  Root: undefined;
  home: undefined;
  purchases: undefined;
  customers: undefined;
}


const Tab = createBottomTabNavigator<RootTabParamList>()

export default function AppRoutes() {
  return (
    <Tab.Navigator
      tabBar={(props) => (<TabBar {...props} />)}
      backBehavior='history'
      screenOptions={{
        animation: 'none',
      }}
    >

      <Tab.Screen name='home' component={HomeScreen} options={{
        tabBarLabel: 'início',
        headerShown: false
      }} />
      <Tab.Screen name='purchases' component={PurchasesScreen} options={{
        tabBarLabel: 'vendas',
        header: () => <NavigationHeader title='Vendas' />
      }} />
      <Tab.Screen name='customers' component={CustomerStackRoutes} options={{
        tabBarLabel: 'clientes',
        headerShown: false
      }} />

    </Tab.Navigator>
  )
}