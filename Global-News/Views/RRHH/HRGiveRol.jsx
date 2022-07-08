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
import styles from "../../styles/RRHH/hrGiveRol"
import SearchInput from "../Search/SearchInput";
import { searchAllUsers } from "../../store/user";
import { rrhhGiveRol } from "../../store/position"
import { searchUsersByInput } from "../../store/user";



export default function HRGiveRol() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(searchAllUsers())
  }, []);

  const handlePromote = (userId,position) => {
  dispatch(rrhhGiveRol( {userId: userId, position: position}))
  dispatch(searchAllUsers());
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <SearchInput dispatchInput={searchUsersByInput}/>
    <Text style={styles.mainText}>Promover Empleados</Text>
      <SectionList
        sections={[{ title: "Promover Empleados", data: users}]}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>
              Solicitante: {item.firstName} {item.lastName}
            </Text>
            <Text>{(item.user?.positionId === 4)&& "Rango: Empleado"}{(item.user?.positionId === 3)&& "Rango: Coordinador"}{(item.user?.positionId === 2)&& "Rango: Jefe"}{(item.user?.positionId === 1)&& "Rango: Gerente"}</Text>
            <Text>Legajo: {item.employeeId}</Text>
            <Text>Nombre: {item.firstName}</Text>
            <Text>Apellido: {item.lastName}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Dias Laborales: {item.workingDays}</Text>
            <Text>Turnos: {item.shift}</Text>
            <View style={styles.buttomView}>

            {(item.positionId != 1)
              &&<Button
                style={styles.button}
                title="Gerente"
                onPress={()=>handlePromote(item.id,"Gerente")}
              />}
              {(item.positionId != 2)
              &&<Button
                style={styles.button}
                title="Jefe"
                onPress={()=>handlePromote(item.id,"Jefe")}
              />}
              {(item.positionId != 3)
              &&<Button
                style={styles.button}
                title="Coordinador"
                onPress={()=>handlePromote(item.id,"Coordinador")}
              />}
              {(item.positionId != 4)
              &&<Button
                style={styles.button}
                title="Empleado"
                onPress={()=>handlePromote(item.id,"Empleado")}
              />}
            </View>
          </View>
        )}
        
        keyExtractor={(item) => item.id}
      /> 
    </SafeAreaView>
  );
}
