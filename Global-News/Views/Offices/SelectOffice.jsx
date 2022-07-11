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
import { officeRequest } from "../../store/office"
import { addUserToOffice } from "../../store/office"



export default function SelectOffice({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.hr);
  const office = useSelector((state) => state.office)
 
  const handlePress = (name)=>{
    dispatch(addUserToOffice({id:user[0].id, name:name}))
    //navigation.navigate("Sumar Empleado al Equipo")
  }
  
  useEffect(() => {
    dispatch(officeRequest())
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.mainText}>Busqueda por Empleado</Text>
      <SectionList
        sections={[{ title: "Sumar empleado a la oficina", data: office}]}
        renderItem={({ item }) => (
           <Pressable onPress={() =>handlePress(item.name)}>
          <View style={styles.row}>
            <Text style={styles.text}>Nombre de la oficina: {item.name}</Text>
            <Text style={styles.text}>Ciudad: {item.city}</Text>
            <Text style={styles.text}>Pais: {item.country}</Text>
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