import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  ImageBackground,
} from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Profile from "./components/Profile";
import HomeButton from "./components/HomeButtons";
import image from "../../assets/background-startScreen-02.png";
import { Badge } from "react-native-paper";
import { sendLogoutRequest } from "../../store/user";
import { sendHRLogoutRequest } from "../../store/hr";

export default function UserProfileView({ navigation }) {
  const user = useSelector((state) => state.user);
  const license = useSelector((state) => state.hr);
  const dispatch = useDispatch();
  const { removeItem } = useAsyncStorage("@storage_key");
  const removeItemFromStorage = async () => {
    await removeItem();
  };

  const logoutHandler = () => {
    if (Platform.OS === "web") {
      localStorage.setItem("email", null);
    } else {
      removeItemFromStorage();
    }
    dispatch(sendLogoutRequest());
    dispatch(sendHRLogoutRequest());
    navigation.replace("Inicio");
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <ScrollView style={styles.container}>
        {user && <Profile />}
        <View style={styles.body}>
          <HomeButton
            text="Perfil"
            onPress={() => navigation.navigate("Mi Perfil")}
          />
          <HomeButton
            text="Dar Presente"
            onPress={() => navigation.navigate("Dar Presente")}
          />

          <HomeButton
            text="Licencias"
            onPress={() => navigation.navigate("Licencias")}
          />
          <HomeButton
            text="Equipos"
            onPress={() => navigation.navigate("Equipos")}
          />

          {user?.positionId === 3 && (
            <>
              <HomeButton
                text="Gestión de Personal"
                onPress={() => navigation.navigate("Vista Principal")}
              />
              {/* Este badge es para mostrar las notificaciones de licencias que todavia no funciona */}
              {/* <Badge style={styles.body} size={30}>
                {license.length}
              </Badge> */}
            </>
          )}

          {user?.positionId === 2 && (
            <HomeButton
              text="Gestión de Personal"
              onPress={() => navigation.navigate("Vista Principal")}
            />
          )}

          {user?.positionId === 1 && (
            <HomeButton
              text="Gestión de Personal"
              onPress={() => navigation.navigate("Vista Principal")}
            />
          )}

          {user?.RRHH && (
            <HomeButton
              text="Gestión de Personal"
              onPress={() => navigation.navigate("Vista Principal")}
            />
          )}
          <HomeButton text="Logout" onPress={() => logoutHandler()} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    minHeight: 700,
  },
});
