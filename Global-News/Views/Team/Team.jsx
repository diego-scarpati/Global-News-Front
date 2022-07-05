import React, { Component, useEffect } from "react";
import { StyleSheet, View, Text, StatusBar, SafeAreaView, SectionList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { teamRequest } from "../../store/team";

const optionsPerPage = [2, 3, 4];

export default function Team() {
  const user = useSelector((state) => state.user);
  const team = useSelector((state)=> state.team)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(teamRequest());
  }, []);

  console.log("user", user);
  console.log("user name", user.firstName);
  console.log("team", team)


  // const [page, setPage] = React.useState(0);
  // const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  // React.useEffect(() => {
  // setPage(0);
  // }, [itemsPerPage]);

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.mainText}>Mi Equipo</Text>
      <SectionList
        sections={[{ title: "Mi Equipo", data: team}]}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>
              Nombre: {item.team.firstName} {item.team.lastName}
            </Text>
            <Text>Email: {item.users.email}</Text>
            <Text>Puesto: {item.users.positionId}</Text>
            <Text>Conectado: {item.users.availability}</Text>
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