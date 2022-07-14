import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "react-native-paper";
import { searchTeamById } from "../../store/team";

export default function Team() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const team = useSelector((state) => state.team);

  const textStyle = { color: "#fff", fontSize: 15, textAlign: "center" };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.mainText}>{team.name}</Text>
          <DataTable style={styles.border}>
            <View>
              <DataTable.Header>
                <DataTable.Title style={styles.head} textStyle={textStyle}>
                  Nombre
                </DataTable.Title>
                <DataTable.Title style={styles.head} textStyle={textStyle}>
                  Apellido
                </DataTable.Title>
                <DataTable.Title style={styles.head} textStyle={textStyle}>
                  Email
                </DataTable.Title>
                <DataTable.Title style={styles.head} textStyle={textStyle}>
                  Puesto
                </DataTable.Title>
                <DataTable.Title style={styles.head} textStyle={textStyle}>
                  Disponible
                </DataTable.Title>
              </DataTable.Header>
              {team.users.map((data) => {
                return (
                  <DataTable.Row key={data.id}>
                    <DataTable.Cell style={styles.text}>
                      {data.firstName}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.text}>
                      {data.lastName}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.text}>
                      {data.email}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.text}>
                      {data.positionId === 4 && "Empleado"}
                      {data.positionId === 3 && "Coordinador"}
                      {data.positionId === 2 && "Jefe"}
                      {data.positionId === 1 && "Gerente"}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.text}>
                      {data.availabilityId === 1 ? "Si": "No"}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </View>
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontSize: 30,
  },
  titles: {
    fontSize: 20,
    color: "black",
  },
  border: { borderWidth: 2, borderColor: "#0073b7" },
  container: { flex: 1, padding: 10, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 50, backgroundColor: "#0073b7", textAlign: "center" },
  text: { margin: 10, textAlign: "center", fontSize: 10 },
});
