import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home';
import PurchasesScreen from '../screens/Purchases';
import CustomersScreen from '../screens/Customers';
import TabBar from '../components/TabBar';
import NavigationHeader from '../components/NavigationHeader';
import CustomerStackRoutes, { CustomerStackParamList } from './customerStack.routes';
import { NavigatorScreenParams } from '@react-navigation/native';
import PaymentsScreen from '../screens/Payments';
import ReportsScreen from '../screens/Reports';

export type RootTabParamList = {
  Root: undefined;
  home: undefined;
  purchases: undefined;
  payments: undefined;
  customers: NavigatorScreenParams<CustomerStackParamList>;
  reports: undefined
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
      initialRouteName='home'
    >

      <Tab.Screen name='reports' component={ReportsScreen} options={{
        tabBarLabel: 'relatórios',
        header: () => <NavigationHeader title='Relatórios' />
      }} />
      <Tab.Screen name='purchases' component={PurchasesScreen} options={{
        tabBarLabel: 'vendas',
        header: () => <NavigationHeader title='Vendas' />
      }} />
      <Tab.Screen name='home' component={HomeScreen} options={{
        tabBarLabel: 'início',
        headerShown: false,
        // tabBarShowLabel: false,
      }} />
      <Tab.Screen name='payments' component={PaymentsScreen} options={{
        tabBarLabel: 'entradas',
        header: () => <NavigationHeader title='Pagamentos' />
      }} />
      <Tab.Screen name='customers' component={CustomerStackRoutes} options={{
        tabBarLabel: 'clientes',
        headerShown: false,
        // header: () => <NavigationHeader title='Clientes' />
      }} />

    </Tab.Navigator>
  )
}