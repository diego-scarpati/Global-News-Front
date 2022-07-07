import React, { Component, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  SectionList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { teamRequest } from "../../store/team";
import { searchAllUsers } from "../../store/user";

export default function Team({route}) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const team = useSelector((state) => state.team);
  const usersList = route.params.users

console.log(route)
  console.log("user", user);
  console.log("team view", team);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DataTable>
                <Text>Equipo: {route.params.name}</Text>
                  <View>
                    <DataTable.Header>
                      <DataTable.Title>Nombre</DataTable.Title>
                      <DataTable.Title>Apellido</DataTable.Title>
                      <DataTable.Title>Email</DataTable.Title>
                      <DataTable.Title>Puesto</DataTable.Title>
                    </DataTable.Header>
                    {usersList.map((data)=>{
                      return(
                    <DataTable.Row key={data.id}>
                      <DataTable.Cell>{data.firstName} </DataTable.Cell>
                      <DataTable.Cell>{data.lastName}</DataTable.Cell>
                      <DataTable.Cell>{data.email}</DataTable.Cell>
                      <DataTable.Cell>Puesto</DataTable.Cell>
                    </DataTable.Row>)})}
                  </View>
        </DataTable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
});
