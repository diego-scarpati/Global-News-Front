import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "./components/HomeButtons";
import { userRequest } from "../../store/user";

export default function HRHomeScreen({ navigation }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.body}>
          <HomeButton
            text="Control asistencias"
            onPress={() => navigation.navigate("Buscar Usuario")}
          />
          <HomeButton
            text="Control solicitud de licencias"
            onPress={() =>user.RRHH? navigation.navigate("Control Solicitud de Licencias") : navigation.navigate("Solicitud Licencias") //Control Solicitud de Licencias
            }
          />
          <HomeButton
            text="Historial de licencias de empleados"
            onPress={() =>
              navigation.navigate("Historial de licencias de empleados")
            }
          />

          {user.RRHH && (
            <View style={styles.body}>
              <HomeButton
                text="Editar datos de usuario"
                onPress={() =>
                  navigation.navigate("Recursos Humanos Seleccionar Usuario")
                }
              />
              <HomeButton
                text="Promover usuario"
                onPress={() =>
                  navigation.navigate("Recursos Humanos Promover Empleado")
                }
              />
              <HomeButton
                text="Sumar usuario al equipo"
                onPress={() => navigation.navigate("Sumar Empleado al Equipo")}
              />
              <HomeButton
                text="Sumar usuario a la oficina"
                onPress={() =>
                  navigation.navigate("Sumar Empleado ala Oficina")
                }
              />
              <HomeButton
                text="Crear equipo"
                onPress={() => navigation.navigate("Crear Equipo")}
              />
              <HomeButton
                text="Crear oficina"
                onPress={() => navigation.navigate("Crear Oficina")}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
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
    height: 600,
    width: "100%",
  },
});
