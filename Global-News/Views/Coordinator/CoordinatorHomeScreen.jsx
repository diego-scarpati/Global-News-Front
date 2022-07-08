import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";
import styles from "../../styles/Coordinator/coordinatorHomeScreen";
import HomeButton from "../HomeScreen/components/HomeButtons";

export default function CoordinatorHomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <HomeButton
          text="Licencias de Equipo"
          onPress={() => navigation.navigate("Coordinador Licencias de Equipo")}
        />
       
      </View>
    </ScrollView>
  );
}

