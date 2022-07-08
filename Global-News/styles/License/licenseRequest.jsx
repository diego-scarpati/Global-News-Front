import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  input: {
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: "row",
  },
  error: {
    color: "#ff0000",
    fontSize: 9,
    marginBottom: 8,
    marginLeft: 6,
  },
});

export default styles;
