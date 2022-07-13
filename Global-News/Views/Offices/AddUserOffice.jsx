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

import { hrSearchUsersByInput } from "../../store/hr";
import { teamRequest } from "../../store/team"


export default function AddUserOffice({navigation}) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.hr);

   
    const handlePress = (id)=>{
    navigation.navigate("Elegir Oficina")
    }

  
  return (
    <SafeAreaView style={styles.container}>
      <SearchInput dispatchInput={hrSearchUsersByInput}/>
      <SectionList
        sections={[{ title: "Buscar Empleado", data: users}]}
        renderItem={({ item }) => (
           <Pressable onPress={() =>handlePress(item.id)}>
            <View style={styles.row}>
            <Text style={styles.text}>Nombre : {item.firstName} {item.lastName}</Text>
            <Text>{(item.user?.positionId === 4)&& "Rango: Empleado"}{(item.user?.positionId === 3)&& "Rango: Coordinador"}{(item.user?.positionId === 2)&& "Rango: Jefe"}{(item.user?.positionId === 1)&& "Rango: Gerente"}</Text>
            <Text>Legajo: {item.employeeId}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Dias Laborales: {item.workingDays}</Text>
            <Text>Turnos: {item.shift}</Text>
            <Text>Equipos: </Text>
            {item.teams.map((team,i)=>{return(<Text> {i+1}-{team.name}</Text>)})}
            <Text>{(item.availabilityId === 1)&& "Disponible: Si"}{(item.availabilityId === 2)&&"Disponible: No"}</Text>
          </View>
          </Pressable>
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