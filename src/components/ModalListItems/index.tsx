import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import { PurchaseWithCustomer } from '@/src/schemas/Purchase/purchase-schema'
import { PaymentSchema, PaymentWithCustomerName } from '@/src/schemas/Payment/payment-schema'
import ListItems from '../ListItems'
import CustomButton from '../CustomButton'
import { COLORS } from '@/src/constants/Colors'

interface ModalListItemsProps {
  title: string,
  purchases?: PurchaseWithCustomer[] | null,
  payments?: PaymentWithCustomerName[] | null,
  visible: boolean,
  handleShowModal: () => void
}

export default function ModalListItems(props: ModalListItemsProps) {

  return (


    <Modal
      visible={props.visible}
      animationType='slide'
      statusBarTranslucent
    // transparent
    >


      {props.purchases && (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20 }}>

          <Text style={{ fontFamily: 'MontserratSemiBold', fontSize: 20, marginTop: 60, color: COLORS.GrayFont }}>{props.title}</Text>
          <ListItems
            purchases={props.purchases}
          />

          <View>
            <CustomButton
              isDisabled={false}
              label='Fechar'
              onPress={props.handleShowModal}
            />
          </View>
        </View>
      )}

      {props.payments && (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20 }}>

          <Text style={{ fontFamily: 'MontserratSemiBold', fontSize: 20, marginTop: 60, color: COLORS.GrayFont }}>{props.title}</Text>
          <ListItems
            payments={props.payments}
          />

          <View>
            <CustomButton
              isDisabled={false}
              label='Fechar'
              onPress={props.handleShowModal}
            />
          </View>
        </View>
      )}
    </Modal>
  )
}