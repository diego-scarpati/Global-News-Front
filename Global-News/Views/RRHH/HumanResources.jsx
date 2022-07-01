import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Button
} from "react-native";
import { rrhhReviewLicense, rrhhChangeLicenseStatus } from "../../store/license";

export default function RrHh() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const licencias = useSelector((state) => state.license);

  useEffect(() => {
    dispatch(rrhhReviewLicense());
  }, []);

  const handleApprove = (licenceId) => {
    console.log("licencia aprobada", licenceId);
    dispatch(rrhhChangeLicenseStatus( {id: licenceId, HRApproval: 'approved'}))
    dispatch(rrhhReviewLicense());
  }

  const handleReject = (licenceId) => {
    console.log("licencia rechazada", licenceId);
    dispatch(rrhhChangeLicenseStatus( {id: licenceId, HRApproval: 'rejected'}))
    dispatch(rrhhReviewLicense());
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={[{ title: "Licencias", data: licencias }]}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>
              Solicitante: {item.user?.firstName} {item.user?.lastName}
            </Text>
            <Text>Tipo de licencia: {item.type}</Text>
            <Text>Inicio: {item.startDate}</Text>
            <Text>Fin: {item.endDate}</Text>
            <Text>Observaciones: {item.observations}</Text>
            <Text>Estado RRHH: {item.HRApproval}</Text>
            {item.HRApproval === 'pending' &&
            <View style={styles.buttomView}>
              <Button
                style={styles.button}
                title="Aprobar"
                onPress={()=>handleApprove(item.id)}
              ></Button>
              <Button
                style={styles.button}
                title="Rechazar"
                onPress={()=>handleReject(item.id)}
              ></Button>
            </View>}
          </View>
        )}
        // renderSectionHeader={({ section }) => (
        //   <View style={styles.sectionHeader}>
        //     <Text>{section.type}</Text>
        //   </View>
        // )}
        keyExtractor={(item) => item.id}
      />
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#0073b7",
    borderWidth: 2,
    margin: 2,
    borderRadius: 5,
  },
  sectionHeader: {
    backgroundColor: "#efefef",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10
  },
  buttomView: {
    margin: 10
  },
  text:{
    fontSize: 20
  }
});
