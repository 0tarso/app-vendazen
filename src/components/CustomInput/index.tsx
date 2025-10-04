import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form';
import { COLORS } from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

interface InputProps {
  control: any;
  name: string;
  placeholder?: string;
  isPassword: boolean
}

export default function CustomInput({ control, name, placeholder, isPassword }: InputProps) {

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
            />
            {!error && <Text style={{ marginTop: 5, fontSize: 12, opacity: 0 }}>.</Text>}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 30,
    // backgroundColor: "red",
    position: 'relative'
  },
  iconContainer: {
    // backgroundColor: 'red',
    width: 35,
    height: 25,
    position: 'absolute',
    right: 0,
    bottom: 30,
    alignItems: 'center',
    zIndex: 100
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.GrayFont,
    fontWeight: '500',
  },
  input: {
    // height: 50,
    width: '100%',
    fontSize: 18,
    borderBottomWidth: 2,
    borderColor: COLORS.GreenSecondary,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: '#d9534f',
  },
  errorText: {
    color: '#d9534f',
    marginTop: 5,
    fontSize: 12,
  },
});