import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {StyleSheet,Text,View,SafeAreaView,SectionList,StatusBar,Pressable} from "react-native";
import { teamRequest } from "../../store/team"
import { addUserToTeam } from "../../store/team"



export default function SelectTeam({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.hr);
  const team = useSelector((state) => state.team)
 
  const handlePress = (name)=>{
    dispatch(addUserToTeam({id:user[0].id, name:name}))
    navigation.navigate("Sumar Empleado al Equipo")
  }
  
  useEffect(() => {
    dispatch(teamRequest())
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.mainText}>Busqueda por Empleado</Text>
      <SectionList
        sections={[{ title: "Sumar empleado al equipo", data: team}]}
        renderItem={({ item }) => (
           <Pressable onPress={() =>handlePress(item.name)}>
          <View style={styles.row}>
            <Text style={styles.text}>Nombre del Equipo: {item.name}</Text>
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