import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "../HomeScreen/components/HomeButtons";

export default function ManagerHomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.body}>
          <HomeButton
            text="Solicitud de Licencias"
            onPress={() => navigation.navigate("Solicitud de Licencias")}
          />
          <HomeButton
            text="Historial Licencias"
            onPress={() => navigation.navigate("Historial Licencias")}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    margin: "50%"
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 700,
    width: "100%",
  }
});
