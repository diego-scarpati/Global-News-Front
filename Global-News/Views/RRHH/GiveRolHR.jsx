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
import { searchAllUsers } from "../../store/user";

export default function RrHh() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user);
  
  console.log(users)

  useEffect(() => {
    dispatch(searchAllUsers());
  }, []);

  const handlePromove = (userId,position) => {
  console.log(userId,position)
    // dispatch(rrhhChangeLicenseStatus( {id: licenceId, HRApproval: 'approved'}))
    // dispatch(rrhhReviewLicense());
  }
 
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.mainText}>Promover Empleados</Text>
      <SectionList
        sections={[{ title: "Promover Empleados", data: users}]}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>
              Solicitante: {item.user?.firstName} {item.user?.lastName}
            </Text>
            <Text>Legajo: {item.employeeId}</Text>
            <Text>Nombre: {item.firstName}</Text>
            <Text>Apellido: {item.lastName}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Dias Laborales: {item.workingDays}</Text>
            <Text>Turnos: {item.shift}</Text>
            <View style={styles.buttomView}>
              <Button
                style={styles.button}
                title="Manager"
                value="Manager"
                onPress={()=>handlePromove(item.id,"manager")}
              />
              <Button
                style={styles.button}
                title="Jefe"
                onPress={()=>handlePromove(item.id,"jefe")}
              />
              <Button
                style={styles.button}
                title="Coordinador"
                onPress={()=>handlePromove(item.id,"coordinador")}
              />
              <Button
                style={styles.button}
                title="Empleado"
                onPress={()=>handlePromove(item.id,"empleado")}
              />
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