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
import SearchInput from "../Search/SearchInput";
import { hrAllUsers } from "../../store/hrGiveRol";
import { rrhhGiveRol } from "../../store/position"
import { hrSearchUsersByInput } from "../../store/hr";


export default function HRGiveRol() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.hrGiveRoll);
  
  
  useEffect(() => {
    dispatch(hrAllUsers())
  }, []);

  const handlePromote = (userId,position) => {
  dispatch(rrhhGiveRol( {userId: userId, position: position}))
  dispatch(hrAllUsers());
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <SearchInput dispatchInput={hrSearchUsersByInput}/>
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
  },
  mainText:{
    fontSize: 30
  }
});