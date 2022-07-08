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
import styles from "../../styles/Boss/bossLicenseRequest";

export default function BossLicencesRequest() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const licencias = useSelector((state) => state.license);

  useEffect(() => {
    dispatch(rrhhReviewLicense());
  }, []);

  const handleApprove = (licenceId) => {
    dispatch(rrhhChangeLicenseStatus( {id: licenceId, bossApproval: 'approved'}))
    dispatch(rrhhReviewLicense());
  }

  const handleReject = (licenceId) => {
    dispatch(rrhhChangeLicenseStatus( {id: licenceId, bossApproval: 'rejected'}))
    dispatch(rrhhReviewLicense());
  };

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.mainText}>Licencias</Text>
      <SectionList
        sections={[{ title: "Licencias", data: licencias }]}
        renderItem={({ item }) => (       
          <View style={styles.row}>
            <Text style={styles.text}>
              Solicitante: {item.user?.firstName} {item.user?.lastName}
            </Text>
            <Text>Legajo: {item.employeeId}</Text>
            <Text>{(item.user?.positionId === 4)&& "Rango: Empleado"}{(item.user?.positionId === 3)&& "Rango: Coordinador"}{(item.user?.positionId === 2)&& "Rango: Jefe"}{(item.user?.positionId === 1)&& "Rango: Gerente"}</Text>
            <Text>Tipo de licencia: {item.type}</Text>
            <Text>Inicio: {item.startDate}</Text>
            <Text>Fin: {item.endDate}</Text>
            <Text>Observaciones: {item.observations}</Text>
            <Text>Estado Jefe: {item.bossApproval}</Text>
            <Text>Estado RRHH: {item.HRApproval}</Text>
            {item.bossApproval === 'pending' &&
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
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

