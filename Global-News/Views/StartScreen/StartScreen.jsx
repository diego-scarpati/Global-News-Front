import React from "react";
import { View, Text, Image, Button, Alert, StyleSheet } from "react-native";
import logo from "../../assets/gnlogogrande-01.png";

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={logo}
          style={{
            height: 100,
            width: 200,
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Login"
          onPress={() => navigation.navigate("Inicio Sesion")} //navigation.navigate("Inicio Sesion")
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Registro")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 10,
  },
});
