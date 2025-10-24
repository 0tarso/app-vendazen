import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/src/constants/Colors'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import CustomDatePicker from '../CustomDatePicker'
import { useCustomer } from '@/src/contexts/CustomerContext'
import { RootTabParamList } from '@/src/routes/app.routes'

interface NavigateHeaderProps {
  title: string
}

enum RouteTitle {
  'customers' = 'Clientes',
  'customer-list' = 'Lista de Clientes',
  'customer-register' = 'Novo Cliente',
  'purchases' = 'Compras',
  'purchase-register' = 'Nova Compra',
  'customer-details' = 'Detalhes do Cliente'
}


export default function NavigationHeader(props: NavigateHeaderProps) {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>()
  const { name: routeName } = useRoute()

  const { setFilterPurchasesDate } = useCustomer()

  const [headerTitle, setHeaderTitle] = useState('')

  const handleSetFilterDate = (date: string) => {
    setFilterPurchasesDate(date)
  }

  useEffect(() => {
    const route = RouteTitle[routeName as keyof typeof RouteTitle]
    setHeaderTitle(route)
  }, [routeName])

  return (
    <View style={styles.container}>
      <View style={styles.navigationArea}>
        <TouchableOpacity hitSlop={10}
          onPress={() => {
            console.log('navwegando')
            navigation.goBack()
          }}
        >
          <Ionicons name='arrow-back-outline' size={26} color={COLORS.GreenPrimary} />

        </TouchableOpacity>
        <Text style={styles.title}>{headerTitle}</Text>

      </View>

      {routeName === 'purchases' && (
        <View style={{}}>
          <CustomDatePicker
            onChangeDate={(dateString) => handleSetFilterDate(dateString)}
          />
        </View>
      )}

      {routeName === 'customer-list' && (
        <TouchableOpacity
          onPress={() => (navigation as any).navigate('customers', { screen: 'customer-register' })}
        >
          <Ionicons name='person-add-outline' size={28} color={COLORS.GreenPrimary} />
        </TouchableOpacity>
      )}
    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary
  },
  navigationArea: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'flex-end',

  },
  title: {
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    marginLeft: 10,
    color: COLORS.GreenPrimary
  },

})