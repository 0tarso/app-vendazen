import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardType } from 'react-native'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form';
import { COLORS } from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

interface InputProps {
  control: any;
  name: string;
  placeholder?: string;
  isPassword: boolean;
  keyboardType?: KeyboardType
}

export default function CustomInput({ control, name, placeholder, isPassword, keyboardType }: InputProps) {

  const [notShowPassword, setNotShowPassword] = useState(true)

  const handleShowPassword = () => {
    setNotShowPassword(!notShowPassword)
  }

  return (
    <View style={styles.container}>

      {isPassword &&
        <TouchableOpacity onPress={handleShowPassword} style={styles.iconContainer}>
          {notShowPassword ? (
            <AntDesign name='eye' size={22} color={COLORS.GreenPrimary} />
          ) : (
            <AntDesign name='eye-invisible' size={20} color={COLORS.GreenPrimary} />
          )}
        </TouchableOpacity>

      }

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder={placeholder}
              placeholderTextColor={COLORS.GrayFont}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isPassword ? notShowPassword : false}
              keyboardType={keyboardType ? keyboardType : 'default'}
            />
            {!error && <Text style={{ marginTop: 5, fontSize: 12, opacity: 0 }}>.</Text>}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}

