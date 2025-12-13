import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 20

  },
  text: {
    paddingHorizontal: 20,
    fontSize: 24,
    fontFamily: 'MontserratRegular',
    color: COLORS.GrayFont
  },
  emptyPurchaseListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.GreenSecondary,
    borderWidth: 2,
    borderRadius: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff'
  },
  emptyPurchaseText: {
    color: '#a3a3a3',
    fontFamily: "MontserratBold",
    fontSize: 16,
    padding: 20
  }
})