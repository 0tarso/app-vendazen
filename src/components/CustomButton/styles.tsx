import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  button: {
    backgroundColor: COLORS.GreenPrimary,
    borderRadius: 50
  },
  label: {
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    fontFamily: 'MontserratBold'
  }
})