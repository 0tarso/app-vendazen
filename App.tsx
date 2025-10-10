import { View } from 'react-native';
import { useFonts } from 'expo-font'
import { useCallback, useEffect } from 'react';
import { Routes } from './src/routes';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserProvider } from './src/contexts/UserDataContext';
import { CustomerProvider } from './src/contexts/CustomerContext';

export default function App() {

  const [fontsLoaded, error] = useFonts({
    JuliusSansRegular: require('./assets/fonts/JuliusSansOne-Regular.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratThin: require('./assets/fonts/Montserrat-Thin.ttf'),
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
  })


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // Esconde a splash screen apenas quando as fontes estiverem carregadas
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) console.log("Fontes carregadas")
    else console.log('Erro ao carregar fontes => ', error)
  }, [fontsLoaded, error])


  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthProvider>
        <UserProvider>
          <CustomerProvider>
            <Routes />
          </CustomerProvider>
        </UserProvider>
      </AuthProvider>
    </View>
  );
}