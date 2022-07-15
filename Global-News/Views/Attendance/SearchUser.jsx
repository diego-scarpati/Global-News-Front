import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Pressable
} from "react-native";
import SearchInput from "../Search/SearchInput";
import { attendaceControl } from "../../store/attendance"
import { hrSearchUsersByInput } from "../../store/hr"
import { searchTeamById } from "../../store/team"


export default function SearchUser({navigation}) {
  const dispatch = useDispatch();
  const searchAllUsers = useSelector((state) => state.hr);
  const user = useSelector((state) => state.user)

    const handlePress = (id)=>{
    dispatch(attendaceControl({id:id}))
    navigation.navigate("Control Asistencias")
    }

    const onPress = (name,id) => {
      const request = async () => {
        const team = await dispatch(searchTeamById(id));
        navigation.navigate("Busqueda por Usuario", {name,asistencia:true});
      };
      request();
    };
   
   
  
  return (
    (user.RRHH)?(
    <SafeAreaView style={styles.container}>
    <Text style={styles.mainText}>Busqueda por Empleado</Text>
       <SearchInput dispatchInput={(hrSearchUsersByInput)}/> 
      <SectionList
        sections={[{ title: "Promover Empleados", data: searchAllUsers}]}
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
    </SafeAreaView>)
    :(
      <SafeAreaView style={styles.container}>
      
        <Text style={styles.mainText}>Seleccionar Equipos</Text>
        {(user.teams.length == 0) && <Text>No estas en ningun equipo</Text>}
        <SectionList
          sections={[{ title: "Equipos", data: user.teams }]}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Pressable onPress={() => onPress(item.name,item.id)}>
                <Text style={styles.text}>{item.name}</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      
    </SafeAreaView>
    )
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
    fontSize: 22
  }
});