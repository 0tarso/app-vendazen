import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/src/constants/Colors'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import CustomDatePicker from '../CustomDatePicker'
import { useCustomer } from '@/src/contexts/CustomerContext'
import { RootTabParamList } from '@/src/routes/app.routes'
import { styles } from './styles'

interface NavigateHeaderProps {
  title: string
}

enum RouteTitle {
  'customers' = 'Clientes',
  'customer-list' = 'Lista de Clientes',
  'customer-register' = 'Novo Cliente',
  'purchases' = 'Lista de Vendas',
  'purchase-register' = 'Nova Compra',
  'customer-details' = 'Detalhes do Cliente',
  'payment-register' = 'Adicionar Pagamento',
  'payments' = 'Lista de Pagamentos',
  'customer-edit' = 'Dados do Cliente',
  'reports' = 'Relatórios'
}


export default function NavigationHeader(props: NavigateHeaderProps) {

  const navigation = useNavigation<NavigationProp<RootTabParamList>>()

  const { name: routeName } = useRoute()

  const [headerTitle, setHeaderTitle] = useState('')

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
          <Ionicons name='chevron-back-outline' size={24} color={COLORS.GreenPrimary} />

        </TouchableOpacity>
        <Text style={styles.title}>{headerTitle}</Text>

      </View>

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


