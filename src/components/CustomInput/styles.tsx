import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 30,
    // backgroundColor: "red",
    position: 'relative'
  },
  iconContainer: {
    // backgroundColor: 'red',
    width: 35,
    height: 25,
    position: 'absolute',
    right: 0,
    bottom: 30,
    alignItems: 'center',
    zIndex: 100
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.GrayFont,
    fontWeight: '500',
  },
  input: {
    // height: 50,
    width: '100%',
    fontSize: 18,
    borderBottomWidth: 2,
    borderColor: COLORS.GreenSecondary,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: '#d9534f',
  },
  errorText: {
    color: '#d9534f',
    marginTop: 5,
    fontSize: 12,
  },
});