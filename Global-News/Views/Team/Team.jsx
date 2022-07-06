import React, { Component, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { searchAllUsers } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";

export default function Team() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(searchAllUsers())
  }, []);




  return (
    users.lenght? users.map( user => (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title numeric>Age</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>{user.firstName}</DataTable.Cell>
          <DataTable.Cell>john@kindacode.com</DataTable.Cell>
          <DataTable.Cell numeric>33</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
   )):
   <Text>NOP</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
});
