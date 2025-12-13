import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  initiValueTextStyle: {
    textAlign: 'left', fontWeight: 400, fontSize: 18, color: "#050505"
  },

  selectStyle: {
    borderWidth: 0,
    borderBottomColor: COLORS.GreenSecondary,
    borderBottomWidth: 2,
  },
  selectTextStyle: {
    textAlign: 'left', fontWeight: 400, fontSize: 18, color: "#050505"
  },

  overlayStyle: {
    backgroundColor: COLORS.WhiteBackground
  },

  optionTextStyle: {
    color: COLORS.GreenPrimary, fontFamily: 'MontserratRegular'
  },
  optionStyle: {
    borderWidth: 2, borderColor: COLORS.GreenSecondary, backgroundColor: "#fff", marginBottom: 8, borderRadius: 10, elevation: 1
  },
  optionContainerStyle: {
    backgroundColor: COLORS.WhiteBackground
  },

  cancelStyle: {
    backgroundColor: COLORS.GreenPrimary, borderRadius: 25
  },
  cancelTextStyle: {
    color: "#ffff", fontFamily: "MontserratBold", fontSize: 22
  }
})