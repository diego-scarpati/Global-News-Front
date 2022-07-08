import React,{ useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar} from "react-native";
import { sendHistoyLicensesRequest } from "../../store/license"
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import styles from "../../styles/License/licenseHistory";



export default function RrHh() {
  const dispatch = useDispatch();
  const licencias = useSelector((state) => state.license);
  useEffect(() => {dispatch(sendHistoyLicensesRequest())},[])

console.log(licencias)
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={[{ title: "Historial licencias", data: licencias }]}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>Tipo de licencia: {item.type}</Text>
            <Text>Inicio: {item.startDate}</Text>
            <Text>Fin: {item.endDate}</Text>
            <Text>Observaciones: {item.observations}</Text>
            <Text>Estado Jefe: {item.bossApproval}</Text>
            <Text>Estado RRHH: {item.HRApproval}</Text>
          </View>
        )}
       
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
