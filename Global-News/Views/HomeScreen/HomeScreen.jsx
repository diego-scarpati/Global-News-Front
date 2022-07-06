import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";

import Profile from "./components/Profile";
import HomeButton from "./components/HomeButtons";

export default function UserProfileView({ navigation }) {
  const user = useSelector((state) => state.user);

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
            text="Vista Principal"
            onPress={() => navigation.navigate("Vista Principal")}
          />
          
        )}

        {user.positionId === 2 && (
          <HomeButton text="Vista Principal" onPress={() => navigation.navigate("Vista Principal")} />
        )}

        {user.positionId === 1 && (
          <HomeButton text="Vista Principal" onPress={() => navigation.navigate("Vista Principal")} />
        )}

        {user.RRHH && (
          <HomeButton
            text="Vista Principal"
            onPress={() => navigation.navigate("Vista Principal")}
          />
        )}
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
