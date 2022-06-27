import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function HomeButton() {
  const data = [
    {
      key: "1",
      name: "Mis Datos",
      img: "https://img.icons8.com/ios/344/resume.png",
    },
    {
      key: "2",
      name: "Licencias",
      img: "https://img.icons8.com/material-outlined/344/chrome-reader-mode.png",
    },
    {
      key: "3",
      name: "Presentismo",
      img: "https://img.icons8.com/small/344/document.png",
    },
    {
      key: "4",
      name: "Equipos",
      img: "https://img.icons8.com/small/344/conference.png",
    },
  ];

  const list = () => {
    return data.map((element) => {
      return (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => {}}>
            <View key={element.key} style={styles.iconContent}>
              <Image style={styles.icon} source={element.img} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>{element.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  };
  return <View>{list()}</View>;
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
