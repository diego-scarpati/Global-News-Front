import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from "react-native";

export default function HomeButton(props) {
  const {text, img, onPress} = props

      return (
        <View style={styles.item}>
          <Button title={text} style={styles.to} onPress={onPress}/>
        </View>
      );
}

const styles = StyleSheet.create({
  to:{
    // backgroundColor: '#0073b7',
    // borderRadius: 5,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  
});