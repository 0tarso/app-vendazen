import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    flex: 1,
    // height: '100%',
    position: 'relative'
  },
  logoContainer: {
    // marginBottom: 100,
    paddingTop: 100,
    alignItems: 'flex-start'
  },
  textContainer: {
    // backgroundColor: "green",
    marginTop: 40
  },
  text: {
    fontFamily: 'MontserratSemiBold',
    color: COLORS.GrayFont,
    fontSize: 30
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0
  },
  buttonArea: {
    height: '60%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 250,
    width: '100%'
  },
  visibleKeyboardButtonContainer: {
    paddingHorizontal: 20
  },
  backButtonContainer: {
    position: 'absolute',
    bottom: 200,
    width: '100%',
    // zIndex: 20,
    // backgroundColor: 'red'
  },
  backButtonText: {
    textAlign: 'center',
    fontFamily: 'MontserratSemiBold',
    color: COLORS.GrayFont,
    fontSize: 22,
    marginTop: 10
  }
})