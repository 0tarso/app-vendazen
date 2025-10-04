import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home';
import PurchasesScreen from '../screens/Purchase';
import CustomersScreen from '../screens/Customer';
import TabBar from '../components/TabBar';

export type RootTabParamList = {
  Root: undefined;
  home: undefined;
  purchases: undefined;
  customers: undefined;
}


const Tab = createBottomTabNavigator<RootTabParamList>()

export default function TabsRoutes() {
  return (
    <Tab.Navigator
      tabBar={(props) => (<TabBar {...props} />)}
    >

      <Tab.Screen name='home' component={HomeScreen} options={{
        tabBarLabel: 'início',
        headerShown: false
      }} />
      <Tab.Screen name='purchases' component={PurchasesScreen} options={{
        tabBarLabel: 'vendas'
      }} />
      <Tab.Screen name='customers' component={CustomersScreen} options={{
        tabBarLabel: 'clientes'
      }} />

    </Tab.Navigator>
  )
}