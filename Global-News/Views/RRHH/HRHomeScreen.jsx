import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";

import HomeButton from "../HomeScreen/components/HomeButtons";

export default function HRHomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <HomeButton
          text="Solicitud de Licencias"
          onPress={() => navigation.navigate("Recursos Humanos Solicitud de Licencias")}
        />
        <HomeButton
          text="Promover Empleado"
          onPress={() => navigation.navigate("Recursos Humanos Promover Empleado")}
        />
        <HomeButton
          text="Historial de Licencias"
          onPress={() => navigation.navigate("Recursos Humanos Historial de Licencias")}
        />
        <HomeButton
          text="Editar Usuario"
          onPress={() => navigation.navigate("Recursos Humanos Editar Usuario")}
        />
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