import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gView: {
    height: 65,
    width: 200,
    justifyContent: "center",
  },
  gButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  gImage: {
    height: 50,
    width: 50,
    marginLeft: 6,
  },
  gText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 6,
    padding: 6,
  },
});

export default styles;
