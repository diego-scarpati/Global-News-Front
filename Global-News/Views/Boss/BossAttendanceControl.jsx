import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Button,
  Pressable
} from "react-native";
import SearchInput from "../Search/SearchInput";
import { searchAllUsers } from "../../store/user";
import { attendaceControl } from "../../store/attendance"
import { searchUsersByInput } from "../../store/user";
import styles from "../../styles/Boss/bossAttendanceControl";


export default function BossAttendanceControl({navigation}) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
   
    const handlePress = (id)=>{
    dispatch(attendaceControl({id:id}))
    navigation.navigate("Control Asistencias")
    }

  
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.mainText}>Busqueda por Empleado</Text>
      <SearchInput dispatchInput={searchUsersByInput}/>
      <SectionList
        sections={[{ title: "Promover Empleados", data: users}]}
        renderItem={({ item }) => (
           <Pressable onPress={() =>handlePress(item.id)}>
          <View style={styles.row}>
            <Text style={styles.text}>Solicitante: {item.firstName} {item.lastName}</Text>
            <Text>{(item.user?.positionId === 4)&& "Rango: Empleado"}{(item.user?.positionId === 3)&& "Rango: Coordinador"}{(item.user?.positionId === 2)&& "Rango: Jefe"}{(item.user?.positionId === 1)&& "Rango: Gerente"}</Text>
            <Text>Legajo: {item.employeeId}</Text>
            <Text>Nombre: {item.firstName}</Text>
            <Text>Apellido: {item.lastName}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Dias Laborales: {item.workingDays}</Text>
            <Text>Turnos: {item.shift}</Text>
            <Text>{(item.availabilityId === 1)&& "Disponible: Si"}{(item.availabilityId === 2)&&"Disponible: No"}</Text>
          </View>
          </Pressable>
        )}
        
        keyExtractor={(item) => item.id}
      /> 
    </SafeAreaView>
  );
}
