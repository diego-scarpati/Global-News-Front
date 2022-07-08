import {StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",

    },
    containerButton: {
      margin: 10
    },
    button: {
      margin: 2,
      backgroundColor: "black",
      borderColor: "white",
      borderRadius: 30,
      width: 170,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 18,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
    image: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    logo: {
      alignItems: "center",
      justifyContent: "center",

    }
  });

export default styles