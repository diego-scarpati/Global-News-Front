import React, { useEffect } from "react";
import {StyleSheet,Text,SafeAreaView,StatusBar} from "react-native";
import Section from "./component/Section"
import BossSection from "./component/BossSection"
import { useDispatch, useSelector } from "react-redux";

export default function HRLicensesRequest() {
const dispatch = useDispatch();
const user = useSelector((state) => state.user);


  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.mainText}>Licencias</Text>
      {user.RRHH ? <Section/> : <BossSection/> }
      
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
