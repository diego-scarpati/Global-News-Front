import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/RRHH/hrAttendanceController";
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
import { searchAllUsers } from "../../store/user";
import { allAttendace } from "../../store/attendance";

export default function AttendanceControler() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const attendance = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(searchAllUsers());
    dispatch(allAttendace());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>Control de asistencias</Text>
      <SectionList
        sections={[{ title: "Control de asistencias", data: attendance }]}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>Nombre: {item.user.firstName}, {item.user.lastName}</Text>
            <Text>Legajo: {item.user.employeeId? item.user.employeeId : null}</Text>
            <Text>Ingreso: {item.workDayStart}</Text>
            <Text>Egreso: {item.workDayEnd}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
