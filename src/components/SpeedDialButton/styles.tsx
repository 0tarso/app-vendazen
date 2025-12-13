import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: COLORS.GreenPrimary,
    borderRadius: 15,
    padding: 10,
    // position: 'absolute',
    // right: 20,
    // top: -60,
    elevation: 12,
    zIndex: 300,
    // borderBottomWidth: 2,
    borderColor: COLORS.GreenSecondary
  },
  addNavContainer: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingVertical: 15,
    width: 320,
    height: 350,
    paddingHorizontal: 20,
    // paddingLeft: 30,
    // borderWidth: 2,
    borderTopWidth: 5,
    borderTopColor: COLORS.GreenPrimary,
    borderLeftColor: COLORS.GreenPrimary,
    borderLeftWidth: 4,
    // borderColor: COLORS.GreenSecondary,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    // left: 0,
    // top: -210,
    bottom: -100,
    zIndex: -10,
    elevation: 30
  },
  addNavTitle: {
    color: COLORS.GreenPrimary,
    fontFamily: 'MontserratSemiBold',
    paddingBottom: 10,
    marginLeft: 10

  },
  addNavItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'baseline',
    borderBottomWidth: 2,
    borderBottomColor: '#f5f5f5'
  },
  addNavItemText: {
    fontFamily: "MontserratBold",
    color: COLORS.GreenPrimary,
    fontSize: 20,
    marginLeft: 10,
  }
})