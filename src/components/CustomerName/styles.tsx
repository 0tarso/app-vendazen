import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  name: {
    color: COLORS.GreenPrimary,
    fontFamily: 'MontserratSemiBold',
    fontSize: 30
  },
})