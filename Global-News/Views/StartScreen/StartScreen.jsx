import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import logo from "../../assets/gnlogogrande-01.png";
import image from "../../assets/background-startScreen-02.png";

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
          <Image
            source={logo}
            style={{
              height: 100,
              width: 200,
            }}
          />
        </View>
        <View style={styles.containerButton}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Inicio Sesion")} //navigation.navigate("Inicio Sesion")
          >
            <Text style={styles.text}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Registro")}
          >
            <Text style={styles.text}>Register</Text>
          </Pressable>
        </View>
      </ImageBackground>
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
  containerButton: {
    margin: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    minHeight: 700,
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 2,
    backgroundColor: "#0073b7",
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
});
