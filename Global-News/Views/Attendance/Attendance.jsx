import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { availabilityRequest } from "../../store/availability";
import {
  attendaceStartRequest,
  attendaceEndRequest,
} from "../../store/attendance";

export default function Attendance({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const attendance = useSelector((state) => state.attendance);

  console.log("attendance", attendance);

  const date = () => {
    const fecha = new Date();
    return `${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()}, ${fecha.getHours()}:${String(
      fecha.getMinutes()
    ).padStart(2, "0")}:${String(fecha.getSeconds()).padStart(2, "0")}`;
  };

  const handlePress = (userId, info) => {
    dispatch(availabilityRequest({ id: userId, available: info }));
    if (info) {
      dispatch(attendaceStartRequest({ workDayStart: date(), id: userId }));
    } else {
      dispatch(
        attendaceEndRequest({
          workDayEnd: date(),
          id: attendance.id,
        })
      );
    }
    navigation.navigate("Pantalla Principal");
  };

  return (
    <View style={styles.item}>
      <View>
        <Button title="Check In" onPress={() => handlePress(user.id, true)} />
      </View>
      <View>
        <Button title="Check Out" onPress={() => handlePress(user.id, false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 10,
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
  },
});
