import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ScaleInView } from '../ScaleInView'
import { COLORS } from '@/src/constants/Colors'
import { RootTabParamList } from '@/src/routes/app.routes'

interface SpeedDialProps {
  customerId?: number
}

export default function SpeedDialButton(props: SpeedDialProps) {

  const navigation = useNavigation<NavigationProp<RootTabParamList>>()

  const [showAddNav, setShowNavAdd] = useState(false)

  const translateY = useRef(new Animated.Value(0)).current;

  const rotate = useRef(new Animated.Value(0)).current;
  const rotateStr = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  });

  useEffect(() => {
    Animated.spring(rotate, {
      toValue: showAddNav ? 1 : 0,
      useNativeDriver: false,
      friction: 4,
      tension: 10,
    }).start();

    Animated.spring(translateY, {
      toValue: showAddNav ? -170 : -20,
      useNativeDriver: false,
      friction: 50,
      tension: 300,
    }).start();


  }, [showAddNav]);

  const handleShowAddNav = () => {
    setShowNavAdd(!showAddNav)
    console.log('clique botao')
  }


  return (
    <View>
      <Animated.View style={{
        position: 'absolute',
        right: 20,
        bottom: 70,
        transform: [{ translateY }],
        zIndex: 200,
      }}
        pointerEvents={'box-none'}>
        <TouchableOpacity style={styles.addButton} onPress={handleShowAddNav}
          activeOpacity={0.8}
          hitSlop={30}
        >
          <Animated.View style={{
            transform: [
              { rotate: rotateStr }]
          }}>
            <Ionicons name='add-outline' size={40} color={"#fff"} />
          </Animated.View>

        </TouchableOpacity>
      </Animated.View>

      {showAddNav && (
        <ScaleInView >

          <View style={styles.addNavContainer}>

            <Text style={styles.addNavTitle}>Adicionar</Text>

            <TouchableOpacity style={styles.addNavItem}
              onPress={() => navigation.navigate('customers',
                {
                  screen: 'customer-list',
                  params: { open: 'purchase-register', customerId: props.customerId ?? null }
                })}
            >
              <Ionicons name='cart-outline' size={32} color={COLORS.GreenPrimary} />
              <Text style={styles.addNavItemText}>Venda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addNavItem}
              onPress={() => navigation.navigate('customers',
                {
                  screen: 'customer-list',
                  params: { open: 'payment-register', customerId: props.customerId ?? null }
                })}
            >
              <Ionicons name='cash-outline' size={32} color={COLORS.GreenPrimary} />
              <Text style={styles.addNavItemText}>Pagamento</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addNavItem}
              onPress={() => navigation.navigate('customers',
                {
                  screen: 'customer-list',
                  params: { open: 'customer-register' }
                })}
            >
              <Ionicons name='person-add-outline' size={32} color={COLORS.GreenPrimary} />
              <Text style={styles.addNavItemText}>Cliente</Text>
            </TouchableOpacity>

          </View>
        </ScaleInView>
      )}

    </View>
  )
}


const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: COLORS.GreenPrimary,
    borderRadius: 15,
    padding: 10,
    // position: 'absolute',
    // right: 20,
    // top: -60,
    elevation: 12,
    zIndex: 300,
    // borderBottomWidth: 2,
    borderColor: COLORS.GreenSecondary
  },
  addNavContainer: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingVertical: 15,
    width: 320,
    height: 350,
    paddingHorizontal: 20,
    // paddingLeft: 30,
    // borderWidth: 2,
    borderTopWidth: 5,
    borderTopColor: COLORS.GreenPrimary,
    borderLeftColor: COLORS.GreenPrimary,
    borderLeftWidth: 4,
    // borderColor: COLORS.GreenSecondary,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    // left: 0,
    // top: -210,
    bottom: -100,
    zIndex: -10,
    elevation: 30
  },
  addNavTitle: {
    color: COLORS.GreenPrimary,
    fontFamily: 'MontserratSemiBold',
    paddingBottom: 10,
    marginLeft: 10

  },
  addNavItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'baseline',
    borderBottomWidth: 2,
    borderBottomColor: '#f5f5f5'
  },
  addNavItemText: {
    fontFamily: "MontserratBold",
    color: COLORS.GreenPrimary,
    fontSize: 20,
    marginLeft: 10,
  }
})