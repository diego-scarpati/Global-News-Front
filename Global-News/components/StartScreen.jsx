import React from "react";
import { View, Text, Image, Button, Alert, StyleSheet } from "react-native";
import logo from "../assets/gnlogogrande-01.png";

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
      <View>
        <Button style={styles.button} title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
      <View>
        <Button
          style={styles.button}
          title="Register"
          onPress={() => navigation.navigate("Register")}
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
  button:{
    
  }
});
