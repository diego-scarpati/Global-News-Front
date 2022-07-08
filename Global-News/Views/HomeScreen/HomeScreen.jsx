import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, ScrollView, Platform } from "react-native";
import storage from "../../storage/storage";
import Profile from "./components/Profile";
import HomeButton from "./components/HomeButtons";

export default function UserProfileView({ navigation }) {
  const user = useSelector((state) => state.user);

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
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Profile /> */}
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
          onPress={() => navigation.navigate("Equipos")}
        />
        <HomeButton
          text="Dar Presente"
          onPress={() => navigation.navigate("Dar Presente")}
        />

        {/* {user.positionId === 3 && (
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
        )} */}
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
