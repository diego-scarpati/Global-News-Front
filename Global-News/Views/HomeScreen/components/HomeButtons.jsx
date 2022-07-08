import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Pressable
} from "react-native";

export default function HomeButton(props) {
  const { text, img, onPress } = props;

  return (
    <View style={styles.item}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  to: {
    // backgroundColor: '#0073b7',
    // borderRadius: 5,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  button: {
    margin: 2,
    backgroundColor: "#0073b7",
    borderColor: "white",
    borderRadius: 30,
    width: 300,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
