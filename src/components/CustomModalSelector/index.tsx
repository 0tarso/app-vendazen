import React, { useState } from 'react'
import ModalSelector from 'react-native-modal-selector'
import { COLORS } from '@/src/constants/Colors'
import { Text } from 'react-native'


interface CustomModalSelectorProps {
  data: { key: number, label: string }[]
  onChange: (key: number, label: string) => void,
  placeholder: string
  // selectedValue: string | number | null
}

export default function CustomModalSelector(props: CustomModalSelectorProps) {


  const [selectedValue, setSelectedValue] = useState<string | number | null>(null)

  return (
    <>

      <ModalSelector
        data={props.data}
        initValue={selectedValue ? selectedValue.toString() : props.placeholder}
        initValueTextStyle={{ textAlign: 'left', fontWeight: 400, fontSize: 18, color: "#050505" }}
        onChange={(option) => {
          props.onChange(option.key, option.label)
          setSelectedValue(option.label)
        }}
        animationType='slide'
        listType='FLATLIST'
        selectStyle={{
          borderWidth: 0,
          borderBottomColor: COLORS.GreenSecondary,
          borderBottomWidth: 2,
        }}
        overlayStyle={{ backgroundColor: COLORS.WhiteBackground }}
        selectTextStyle={{ textAlign: 'left', fontWeight: 400, fontSize: 18, color: "#050505" }}

        optionTextStyle={{ color: COLORS.GreenPrimary, fontFamily: 'MontserratRegular' }}
        optionStyle={{ borderWidth: 2, borderColor: COLORS.GreenSecondary, backgroundColor: "#fff", marginBottom: 8, borderRadius: 10, elevation: 1 }}
        optionContainerStyle={{ backgroundColor: COLORS.WhiteBackground }}

        cancelText='Fechar'
        cancelStyle={{ backgroundColor: COLORS.GreenPrimary, borderRadius: 25 }}
        cancelTextStyle={{ color: "#ffff", fontFamily: "MontserratBold", fontSize: 22 }}

      />

    </>
  )
}