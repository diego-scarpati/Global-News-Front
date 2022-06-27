import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link, Redirect, Route, Switch } from "react-router-native";
import logo from "../assets/gnlogogrande-01.png";

export default function StartScreen({ navigation }) {
  console.log(navigation);
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
      <View>
        <Button
          style={styles.button}
          title="License"
          onPress={() => navigation.navigate("License")}
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
