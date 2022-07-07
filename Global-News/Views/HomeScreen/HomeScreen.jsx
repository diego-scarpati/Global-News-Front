import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, ScrollView, Platform } from "react-native";
import storage from "../../storage/storage";
import Profile from "./components/Profile";
import HomeButton from "./components/HomeButtons";
import { userRequest } from "../../store/user";
import StartScreen from "../StartScreen/StartScreen";
import Constants from "expo-constants";

export default function UserProfileView({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(
    "🚀 ~ file: HomeScreen.jsx ~ line 10 ~ UserProfileView ~ user",
    user
  );

  const logoutHandler = () => {
    if (Platform.OS === "web") {
      localStorage.setItem("email", null)
    } else {
      try {
        storage.remove({
          key: "loggedUser",
        });
      } catch (error) {
        console.log("logoutHandler Error:", error);
      }
    }
    navigation.replace("Inicio");
    // console.log("logout")
  };

  return (
    <ScrollView style={styles.container}>
      <Profile />
      <View style={styles.body}>
        <HomeButton
          text="Perfil"
          onPress={() => navigation.navigate("Mi Perfil")}
        />
        <HomeButton
          text="Licencias"
          onPress={() => navigation.navigate("Licencias")}
        />
        <HomeButton
          text="Equipos"
          onPress={() => navigation.navigate("Equipo")}
        />
        <HomeButton
          text="Dar Presente"
          onPress={() => navigation.navigate("Dar Presente")}
        />

        {user.positionId === 3 && (
          <HomeButton
            text="Coordinador"
            onPress={() => navigation.navigate("Coordinador")}
          />
        )}

        {user.positionId === 2 && (
          <HomeButton text="Jefe" onPress={() => navigation.navigate("Jefe")} />
        )}

        {user.positionId === 1 && (
          <HomeButton
            text="Gerente"
            onPress={() => navigation.navigate("Gerente")}
          />
        )}

        {user.RRHH && (
          <HomeButton
            text="Recursos Humanos"
            onPress={() => navigation.navigate("Recursos Humanos")}
          />
        )}
        <HomeButton text="Logout" onPress={() => logoutHandler()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#f89d1e",
    height: 1000,
    alignItems: "center",
  },
});
