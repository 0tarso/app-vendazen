import React, { useState } from 'react'
import ModalSelector from 'react-native-modal-selector'
import { COLORS } from '@/src/constants/Colors'
import { Text } from 'react-native'
import { styles } from './styles'


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
        initValueTextStyle={styles.initiValueTextStyle}

        onChange={(option) => {
          props.onChange(option.key, option.label)
          setSelectedValue(option.label)
        }}
        animationType='slide'
        listType='FLATLIST'

        selectStyle={styles.selectStyle}
        selectTextStyle={styles.selectTextStyle}

        overlayStyle={styles.overlayStyle}

        optionTextStyle={styles.optionTextStyle}
        optionStyle={styles.optionStyle}
        optionContainerStyle={styles.optionContainerStyle}

        cancelText='Fechar'
        cancelStyle={styles.cancelStyle}
        cancelTextStyle={styles.cancelTextStyle}
      />
    </>
  )
}