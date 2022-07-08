import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";
import styles from "../../styles/License/licensesHomeScreen";
import HomeButton from "../HomeScreen/components/HomeButtons";

export default function ManagerHomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <HomeButton
          text="Solicitud de Licencias"
          onPress={() => navigation.navigate("Solicitud de Licencias")}
        />
        <HomeButton
          text="Historial Licencias"
          onPress={() => navigation.navigate("Historial Licencias")}
        />
       
      </View>
    </ScrollView>
  );
}
