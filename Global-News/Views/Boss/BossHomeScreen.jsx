import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";
import styles from "../../styles/Boss/bossHomeScreen";
import HomeButton from "../HomeScreen/components/HomeButtons";

export default function BossHomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <HomeButton
          text="Solicitud de Licencias"
          onPress={() => navigation.navigate("Jefe Solicitud de Licencias")}
        />
       <HomeButton
          text="Control Asistencias"
          onPress={() => navigation.navigate("Asistencias")}
        />
      </View>
    </ScrollView>
  );
}

