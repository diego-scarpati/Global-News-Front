import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function HomeButton(props) {
  const {text, img, onPress} = props

      return (
        <View style={styles.item}>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={img} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>{text}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: 'center'
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-center",
    // paddingRight: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 20,
    marginLeft: 20,
  },
  info: {
    fontSize: 25,
    marginTop: 15,
    color: "#FFFFFF",
  },
});
