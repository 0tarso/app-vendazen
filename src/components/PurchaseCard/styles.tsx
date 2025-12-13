import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginLeft: 12,
    marginRight: 6,
    width: 150,
    alignItems: 'center',
    paddingVertical: 20,
    // padding: 25,
    borderRadius: 30,
    borderColor: COLORS.GreenSecondary,
    borderWidth: 2,
    elevation: 1,
    marginBottom: 10
  },
  purchaseValue: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.GreenPrimary

  },
  purchaseDate: {
    marginTop: 5,
    fontFamily: 'MontserratRegular',
    textAlign: 'center',
    color: COLORS.GreenPrimary
  },
  purchaseTime: {
    fontFamily: 'MontserratRegular',
    textAlign: 'center',
    color: COLORS.GreenPrimary
  }

})