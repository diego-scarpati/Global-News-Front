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
  Pressable,
} from "react-native";


export default function AttendanceControler() {
  const users = useSelector((state) => state.hr);
  const attendance = useSelector((state) => state.attendance);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>Control de asistencias</Text>
      <Text style={styles.text}>
        Nombre: {users[0].firstName} {users[0].lastName}
      </Text>
      <Text style={styles.text}>Legajo: {users[0].employeeId}</Text>
      <SectionList
        sections={[{ title: "Control de asistencias", data: attendance }]}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>Ingreso: {item.workDayStart}</Text>
            <Text>Egreso: {item.workDayEnd}</Text>
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
    marginTop: 5,
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
    padding: 10,
  },
  buttomView: {
    margin: 10,
  },
  text: {
    fontSize: 20,
  },
  mainText: {
    fontSize: 22,
  },
});
