import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 100
  },
  title: {
    fontSize: 24,
    fontFamily: 'MontserratRegular',
    color: COLORS.GrayFont
  },
  cardContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: COLORS.GreenSecondary,
    backgroundColor: '#FFF',
    borderRadius: 15,
    // overflow: 'scroll',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  separator: {
    width: 2,
    backgroundColor: COLORS.GreenSecondary,
    // borderWidth: 0.5,
    // borderColor: COLORS.GreenSecondary,
    height: '100%'
  },
  card: {
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: '',
    width: '33%'
  },
  value: {
    fontFamily: "MontserratSemiBold",
    color: COLORS.GreenPrimary,
    fontSize: 24,
    textAlign: 'center'
  },
  label: {
    paddingHorizontal: 10,
    // width: '80%',
    textAlign: 'center',
    fontFamily: 'MontserratRegular',
    fontSize: 12,
    color: COLORS.GreenPrimary
  }
})