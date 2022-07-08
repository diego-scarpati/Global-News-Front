import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-center",
    // paddingRight: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 20,
    marginLeft: 20,
  },
  info: {
    fontSize: 25,
    marginTop: 15,
    color: "#FFFFFF",
  },
});

export default styles