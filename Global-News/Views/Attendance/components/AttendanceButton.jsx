import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "../../../styles/Attendance/attendanceButton";

export default function AttendanceButton(props) {
  const {text, onPress} = props

      return (
        <View style={styles.item}>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.iconContent}>
              <Image style={styles.icon}/>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>{text}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
}

