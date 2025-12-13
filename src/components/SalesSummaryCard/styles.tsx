import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffff',
    borderWidth: 2,
    borderColor: COLORS.GreenSecondary,
    marginBottom: 10,
    borderRadius: 20,
  },
  title: {
    fontFamily: 'MontserratRegular',
    color: COLORS.GreenPrimary
  },
  currency: {
    fontFamily: 'MontserratRegular',
    color: COLORS.GreenPrimary,
    fontSize: 14
  },
  value: {
    fontFamily: 'MontserratBold',
    fontSize: 26,
    color: COLORS.GreenPrimary
  }
})