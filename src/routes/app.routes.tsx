import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home';
import PurchasesScreen from '../screens/Purchase';
import CustomersScreen from '../screens/Customer';
import TabBar from '../components/TabBar';
import NavigateHeader from '../components/NavigateHeader';

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
        animation: 'fade',

      }}
    >

      <Tab.Screen name='home' component={HomeScreen} options={{
        tabBarLabel: 'início',
        headerShown: false
      }} />
      <Tab.Screen name='purchases' component={PurchasesScreen} options={{
        tabBarLabel: 'vendas',
        header: () => <NavigateHeader title='Vendas' />
      }} />
      <Tab.Screen name='customers' component={CustomersScreen} options={{
        tabBarLabel: 'clientes',
        header: () => <NavigateHeader title='Clientes' />
      }} />

    </Tab.Navigator>
  )
}