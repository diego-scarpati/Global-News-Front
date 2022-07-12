import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { availabilityRequest } from "../../store/availability";
import {
  attendaceStartRequest,
  attendaceEndRequest,
} from "../../store/attendance";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "../HomeScreen/components/HomeButtons";
import {date} from "../../utils/getDate"

export default function Attendance({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const attendance = useSelector((state) => state.attendance);
  
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
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View>
      <HomeButton
          text="Ingreso" 
          onPress={() => handlePress(user.id, true)}
        />
      </View>
      <View>
      <HomeButton
          text="Egreso"
          onPress={() => handlePress(user.id, false)}
        />
      </View>
      </ImageBackground>
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
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 600,
    width: "100%",
  }
});
