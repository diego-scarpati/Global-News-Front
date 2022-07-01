import React from "react";
import {View,} from "react-native";

import AttendanceButton from "./components/AttendanceButton";

export default function Attendance (){
  return (
    <View>
    <AttendanceButton text='Online' onPress={()=>console.log("hola")}/>
    </View>
  )
}