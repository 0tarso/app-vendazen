import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    marginTop: 10,
    paddingHorizontal: 20,
    height: 120,
    borderRadius: 20,
    borderColor: COLORS.GreenSecondary,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'

  },
  deleteContainer: {
    flexDirection: 'column',
    position: 'absolute',
    height: 120,
    padding: 10,
    left: 0,
    right: 0
  },
  deleteMessage: {
    color: COLORS.GrayFont, fontFamily: 'MontserratSemiBold'
  },
  deleteButtonsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,
    marginTop: 5
  },
  deleteButton: {
    flex: 1,
    borderRadius: 11,
    elevation: 1
  },
  trashContainer: {
    position: 'absolute',
    right: 15,
    top: 5,
    // backgroundColor: 'red',
    padding: 5
  },
  text: {
    fontSize: 20
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencyText: {
    fontFamily: 'MontserratBold',
    color: COLORS.GreenPrimary
  },
  amountText: {
    fontFamily: 'MontserratBold',
    color: COLORS.GreenPrimary,
    fontSize: 28
  },
  method: {
    position: 'absolute',
    left: 20,
    bottom: 5,
    color: COLORS.GrayFont
  },
  customerName: {
    fontFamily: 'MontserratRegular',
    fontSize: 20,
    textAlign: 'left',
    color: COLORS.GreenPrimary
  },
  time: {
    position: 'absolute',
    bottom: 5,
    right: "50%",
    color: COLORS.GrayFont
  },
  date: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    color: COLORS.GrayFont
  }
})