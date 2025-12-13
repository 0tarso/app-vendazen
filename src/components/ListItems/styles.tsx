import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    paddingBottom: 80
  },
  noDataMessageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  noDataMessage: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 1,
    textAlign: 'center',
    color: COLORS.GrayFont
  },
  buttonContainer: {
    width: '100%',
    marginTop: 25

  }
})