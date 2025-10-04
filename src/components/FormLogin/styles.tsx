import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logoContainer: {
    // marginBottom: 100,
    paddingTop: 200
  },
  createAccountText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    color: COLORS.GrayFont,
    fontWeight: "600"
  },
  createAccountLink: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: COLORS.GrayFont,
    // fontWeight: 'bold',
    // marginBottom: 100
  }
})