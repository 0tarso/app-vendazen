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
          <Ionicons name='arrow-back-outline' size={20} color={COLORS.GreenPrimary} />

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
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary
  },
  navigationArea: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    marginLeft: 10,
  },

})