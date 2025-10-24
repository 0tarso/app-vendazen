import { ToastAndroid } from "react-native";

export const androidToast = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    20,
  );
}