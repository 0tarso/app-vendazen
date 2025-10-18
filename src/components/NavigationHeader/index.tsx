import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/src/constants/Colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomDatePicker from '../CustomDatePicker'
import { useCustomer } from '@/src/contexts/CustomerContext'

interface NavigateHeaderProps {
  title: string
}

export default function NavigationHeader(props: NavigateHeaderProps) {
  const { navigate, goBack } = useNavigation()
  const { name } = useRoute()

  const { setFilterPurchasesDate } = useCustomer()

  const handleSetFilterDate = (date: string) => {
    setFilterPurchasesDate(date)
  }

  return (
    <View style={styles.container}>
      <View style={styles.navigationArea}>
        <TouchableOpacity hitSlop={10}
          onPress={() => goBack()}
        >
          <Ionicons name='arrow-back-outline' size={26} color={COLORS.GreenPrimary} />

        </TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>

      </View>

      {name === 'purchases' && (
        <View style={{}}>
          <CustomDatePicker
            onChangeDate={(dateString) => handleSetFilterDate(dateString)}
          />
        </View>
      )}

      {name === 'customer-list' && (
        <TouchableOpacity
          onPress={() => navigate('customer-register')}
        >
          <Ionicons name='person-add-outline' size={28} color={COLORS.GreenPrimary} />
        </TouchableOpacity>
      )}
    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WhiteBackground,
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