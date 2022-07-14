import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Pressable,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { availabilityRequest } from "../../store/availability";
import {
  attendaceStartRequest,
  attendaceEndRequest,
} from "../../store/attendance";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "../HomeScreen/components/HomeButtons";
import { userRequest } from "../../store/hrEditUser";
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

  useEffect(() => {
    dispatch(userRequest({userId: user.id}))
  },[user.availabilityId])

  return (
    <View style={styles.item}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
          {user.availabilityId == 1 ? (
            <Pressable style={styles.buttonOff}>
              <Text style={styles.textButton}>Ingreso</Text>
            </Pressable>
          ) : (
            <HomeButton
              text="Ingreso"
              onPress={() => handlePress(user.id, true)}
            />
          )}
        </View>
        <View>
          {user.availabilityId == 2 ? (
            <Pressable style={styles.buttonOff}>
              <Text style={styles.textButton}>Egreso</Text>
            </Pressable>
          ) : (
            <HomeButton
              text="Egreso"
              onPress={() => handlePress(user.id, false)}
            />
          )}
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
    minHeight: 700,
  },
  buttonOff: {
    margin: 2,
    backgroundColor: "#a2a2a2",
    borderColor: "white",
    borderRadius: 30,
    width: 300,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
