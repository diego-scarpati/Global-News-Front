import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {StyleSheet,Text,View,StatusBar,Button} from "react-native";
import { rrhhReviewLicense, rrhhChangeLicenseStatus } from "../../../store/license";

export default function SectionRender({item}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(item)

  const handleApprove = (licenceId) => {
    if(user.positionId === 1 || user.positionId === 2){dispatch(rrhhChangeLicenseStatus( {id: licenceId, bossApproval: 'approved'}))}
    else{dispatch(rrhhChangeLicenseStatus( {id: licenceId, HRApproval: 'approved'}))}
    dispatch(rrhhReviewLicense({id:user.id}));
  }

  const handleReject = (licenceId) => {
    if(user.positionId === 1 || user.positionId === 2){dispatch(rrhhChangeLicenseStatus( {id: licenceId, bossApproval: 'rejected'}))}
    else{dispatch(rrhhChangeLicenseStatus( {id: licenceId, HRApproval: 'rejected'}))}
    dispatch(rrhhReviewLicense({id:user.id}));
  };

  
  return (
          <View style={styles.row}>
            <Text style={styles.text}>Solicitante: {item.user?.firstName} {item.user?.lastName}</Text>
            <Text>Legajo: {item.employeeId}</Text>
            <Text>{(item.user?.positionId === 4)&& "Rango: Empleado"}{(item.user?.positionId === 3)&& "Rango: Coordinador"}{(item.user?.positionId === 2)&& "Rango: Jefe"}{(item.user?.positionId === 1)&& "Rango: Gerente"}</Text>
            <Text>Tipo de licencia: {item.type}</Text>
            <Text>Inicio: {item.startDate}</Text>
            <Text>Fin: {item.endDate}</Text>
            <Text>Observaciones: {item.observations}</Text>
            <Text>Estado Jefe: {item.bossApproval}</Text>
            <Text>Estado RRHH: {item.HRApproval}</Text>
            {item.HRApproval === 'pending' && user.positionId !==3
            && <View style={styles.buttomView}>
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
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#0073b7",
    borderWidth: 2,
    margin: 2,
    borderRadius: 5,
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