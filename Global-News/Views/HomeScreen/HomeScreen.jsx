import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";
import storage from "../../storage/storage";
import Profile from "./components/Profile";
import HomeButton from "./components/HomeButtons";
import { userRequest } from "../../store/user";
import StartScreen from "../StartScreen/StartScreen";
import styles from "../../styles/HomeScreen/homeScreen";

export default function UserProfileView({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(
  //   "🚀 ~ file: HomeScreen.jsx ~ line 10 ~ UserProfileView ~ user",
  //   user
  // );

  // useEffect(()=>{
  //   dispatch(userRequest(userId));
  // },[])

  // try {
  //   storage.getAllDataForKey("loggedUser").then((users) => {
  //     console.log("Users:", users);
  //   });
  // } catch (error) {
  //   console.log("getAllDataForKey", error);
  // }

  // try {
  //   console.log("entre al try");
  //   storage
  //     .load({
  //       key: "loggedUser",
  //       autoSync: true,
  //       syncInBackground: true,
  //     })
  //     .then((ret) => {
  //       console.log("ret", ret);
  //     });
  // } catch (error) {
  //   console.log("entre al catch");
  //   console.warn(error.message);
  // }

  // const logoutHandler = () => {
  //   try {
  //     storage.remove({
  //       key: "loggedUser",
  //     });
  //   } catch (error) {
  //     console.log("logoutHandler Error:", error);
  //   }
  //   navigation.replace("Inicio");
  //   // console.log("logout")
  // };

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
        <HomeButton
          text="Control de Asistencias"
          onPress={() => navigation.navigate("Control Asistencias")}
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
