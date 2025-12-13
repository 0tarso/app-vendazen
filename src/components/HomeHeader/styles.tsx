import { COLORS } from "@/src/constants/Colors";
import { LAYOUT } from "@/src/constants/Layout";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: LAYOUT.PADDING_HORIZONTAL,
    paddingTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 20,
    elevation: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary
  },
  text: {
    fontSize: 16,
    fontFamily: 'MontserratRegular',
    color: "#050505"
  },
  avatarArea: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  avatarContainer: {
    backgroundColor: COLORS.GreenPrimary,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary,
    elevation: 5
  },
  avatarText: {
    fontFamily: 'MontserratBold',
    color: COLORS.WhiteFont
  }
})