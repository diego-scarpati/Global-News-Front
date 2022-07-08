import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "./components/HomeButtons";

export default function HRHomeScreen({ navigation }) {
  const user = useSelector((state) => state.user);
  //chequear si con la persistencia de usuario, tambien persiten los botones
 
  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.body}>
        <HomeButton
          text="Control solicitud de licencias"
          onPress={() => navigation.navigate("Control Solicitud de Licencias")}
        />
        <HomeButton
          text="Control asistencias"
          onPress={() => navigation.navigate("Buscar Usuario")}
        />
        <HomeButton
          text="Historial de licencias de empleados"
          onPress={() =>
            navigation.navigate("Historial de licencias de empleados")
          }
        />
        <HomeButton
          text="Crear equipo"
          onPress={() =>
            navigation.navigate("Crear Equipo")
          }
        />
        <HomeButton
          text="Sumar empleados al equipo"
          onPress={() =>
            navigation.navigate("Sumar Empleado al Equipo")
          }
        />

        {user.RRHH && (
          <View style={styles.body}>
            <HomeButton
              text="Promover Empleado"
              onPress={() =>
                navigation.navigate("Recursos Humanos Promover Empleado")
              }
            />
            <HomeButton
              text="Editar Usuario"
              onPress={() =>
                navigation.navigate("Recursos Humanos Editar Usuario")
              }
            />
             <HomeButton
              text="Crear Oficina"
              onPress={() =>
                navigation.navigate("Crear Oficina")
              }
            />
            <HomeButton
              text="Sumar Empleado a la Oficina"
              onPress={() =>
                navigation.navigate("Sumar Empleado ala Oficina")
              }
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
  }
});