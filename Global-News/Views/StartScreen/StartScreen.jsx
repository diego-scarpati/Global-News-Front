import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import styles from "../../styles/startScreen";
import logo from "../../assets/gnlogogrande-01.png";
import image from "../../assets/background-startScreen-02.png";

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.logo}>
          <Image
            source={logo}
            style={{
              height: 100,
              width: 200,
              marginLeft: 2,
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
