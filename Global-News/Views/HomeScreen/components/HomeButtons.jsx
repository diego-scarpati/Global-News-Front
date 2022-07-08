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
import styles from "../../../styles/HomeScreen/homeButton";

export default function HomeButton(props) {
  const { text, img, onPress } = props;

  return (
    <View style={styles.item}>
      <Pressable
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>

    </View>
  );
}

