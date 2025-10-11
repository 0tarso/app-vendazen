import { COLORS } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    zIndex: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'red'
  },
  openButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GreenPrimary,
  },
  openButtonText: { color: COLORS.GreenPrimary, fontSize: 16 },
  modalOverlay: {
    // zIndex: 20,
    flex: 1,
    // height: "110%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    // backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "85%",
    padding: 15,
    elevation: 15,
    borderWidth: 1,
    borderColor: COLORS.GreenSecondary,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "MontserratRegular",
    textAlign: "center",
    marginBottom: 15,
  },
  pickers: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // height: '40%'
  },
  scroll: {
    flex: 1,
    // height: ITEM_HEIGHT * 3,
  },
  scrollItem: {
    // height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollText: {
    fontSize: 18,
    color: "#999",
    fontFamily: "MontserratRegular",
  },
  selectedText: {
    fontSize: 22,
    color: COLORS.GreenPrimary,
    fontFamily: "MontserratBold",
  },
  centerLine: {
    position: "absolute",
    width: "70%",
    alignSelf: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.GreenSecondary,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  cancelButton: { marginRight: 15 },
  cancelText: { fontFamily: "MontserratRegular" },
  confirmButton: {
    backgroundColor: COLORS.GreenPrimary,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  confirmText: { color: "#fff", fontFamily: "MontserratBold" },
})