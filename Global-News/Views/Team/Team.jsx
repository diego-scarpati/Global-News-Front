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

export default function Team() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const team = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(searchAllUsers());
    dispatch(teamRequest());
  }, []);

  console.log("user", user);
  console.log("team view", team);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DataTable>
          {team.map((data, i) => {
            return (
              <View style={styles.list} key={i}>
                <Text>Equipo: {data.name}</Text>
                {data.users.map((info, i) => (
                  <View>
                    <DataTable.Header>
                      <DataTable.Title>Nombre</DataTable.Title>
                      <DataTable.Title>Apellido</DataTable.Title>
                      <DataTable.Title>Email</DataTable.Title>
                      <DataTable.Title>Puesto</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                      <DataTable.Cell>{info.firstName}</DataTable.Cell>
                      <DataTable.Cell>{info.lastName}</DataTable.Cell>
                      <DataTable.Cell>{info.email}</DataTable.Cell>
                      <DataTable.Cell>Puesto</DataTable.Cell>
                    </DataTable.Row>
                  </View>
                ))}
              </View>
            );
          })}
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
