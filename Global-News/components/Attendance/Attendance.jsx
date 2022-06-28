import React from "react";

import {
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import AttendanceButton from "./components/AttendanceButton";

export default function Attendance (){
  return (
    <View>
    <AttendanceButton text='Online' onPress={()=>console.log("hola")}/>
    </View>
  )
}