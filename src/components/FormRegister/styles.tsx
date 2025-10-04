import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WhiteBackground,
    paddingHorizontal: 20,
    flex: 1,
    // height:'',
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
    bottom: 50,
    width: '100%'
  },
  backButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  backButtonText: {
    textAlign: 'center',
    fontFamily: 'MontserratSemiBold',
    color: COLORS.GrayFont,
    fontSize: 22,
    marginTop: 10
  }
})