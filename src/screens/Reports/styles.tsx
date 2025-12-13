import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: "#ffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary,
    elevation: 2,
    marginVertical: 15,
    paddingVertical: 20,
    overflow: 'hidden'
  },
  titleContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  title: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
    color: COLORS.GrayFont
  },
  noDataText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 16,
    color: COLORS.GrayFont,
    textAlign: 'center',
    paddingVertical: 20
  }
})