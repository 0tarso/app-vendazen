import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonCard: {
    backgroundColor: '#ffff',
    borderWidth: 2,
    borderColor: COLORS.GreenSecondary,
    borderRadius: 15,
    marginTop: 10,
    padding: 20
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  name: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
    color: COLORS.GreenPrimary
  }
})