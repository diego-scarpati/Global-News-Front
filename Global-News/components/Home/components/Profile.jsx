import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Profile() {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://img.icons8.com/ios/344/user-male-circle.png" }}
        />
        <Text style={styles.name}>Mariano Alvarez</Text>
        <Text style={styles.userInfo}>malvarez@globalnewsgroup.com</Text>
        <Text style={styles.userInfo}>Buenos Aires, Argentina</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0073b7",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#f89d1e",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    marginTop: 5,
  },
});
