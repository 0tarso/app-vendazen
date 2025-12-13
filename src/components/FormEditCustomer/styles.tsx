import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 42,
    color: COLORS.GrayFont
  },
  subtitle: {
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    color: COLORS.GrayFont,
    marginBottom: 50
  }
})