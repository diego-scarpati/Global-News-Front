import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";

import HomeButton from "../HomeScreen/components/HomeButtons";

export default function BossHomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <HomeButton
          text="Jefe Solicitud de Licencias"
          onPress={() => navigation.navigate("Jefe Solicitud de Licencias")}
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