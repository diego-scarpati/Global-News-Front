import React from "react";
import {StyleSheet,Text,SafeAreaView,StatusBar} from "react-native";
import Section from "./component/Section"

export default function HRLicensesRequest() {
  
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.mainText}>Licencias</Text>
      <Section/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    justifyContent: "center",
    alignContent: "center",
    padding: 5,
    margin: 5,
  },
  mainText:{
    fontSize: 22
  }
});
