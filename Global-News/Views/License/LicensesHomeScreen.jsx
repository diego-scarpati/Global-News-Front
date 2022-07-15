import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "../HomeScreen/components/HomeButtons";

export default function ManagerHomeScreen({ navigation }) {
  return (
    // <View style={styles.body}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <HomeButton
          text="Solicitud de Licencias"
          onPress={() => navigation.navigate("Solicitud de Licencias")}
        />
        <HomeButton
          text="Historial Licencias"
          onPress={() => navigation.navigate("Historial Licencias")}
        />
      </ImageBackground>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
  },
  image: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
