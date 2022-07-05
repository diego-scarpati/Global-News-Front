import React from "react";
import {View, Button, StyleSheet} from "react-native";

export default function Attendance (){
  return (
    <View style={styles.item}>
    <View >
          <Button title='Check In'/>
       </View>
           <View >
           <Button title='Check Out'/>
        </View>
        </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
  },
});