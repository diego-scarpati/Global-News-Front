import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";

import HomeButton from "./components/HomeButtons";

export default function HRHomeScreen({ navigation }) {
  const user = useSelector((state) => state.user);
  console.log("UserVipScreen",user)
  //chequear si con la persistencia de usuario, tambien persiten los botones
  return (
    <ScrollView style={styles.container}>
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
              text="Sumar Empleado ala Oficina"
              onPress={() =>
                navigation.navigate("Sumar Empleado ala Oficina")
              }
            />
          </View>
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
