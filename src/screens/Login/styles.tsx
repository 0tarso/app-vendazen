import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors";


export const getStyles = (colors: any) => {
  return (
    StyleSheet.create({
      container: {
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        flex: 1,
        // height: '100%',
        position: 'relative'
      },
    })

  )
}
