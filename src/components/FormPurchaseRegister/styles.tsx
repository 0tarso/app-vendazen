import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {

  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 42,
    color: COLORS.GrayFont
  },
  noCustomerListMessage: {
    fontSize: 18,
    fontFamily: 'MontserratSemiBold',
    textAlign: 'center',
    color: COLORS.GreenPrimary,
    marginBottom: 20
  }
})