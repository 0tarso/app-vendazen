import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary
  },
  navigationArea: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'flex-end',

  },
  title: {
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    marginLeft: 10,
    color: COLORS.GreenPrimary
  },

})