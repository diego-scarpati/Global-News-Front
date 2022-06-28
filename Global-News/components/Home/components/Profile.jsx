import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Profile() {

const user = useSelector((state) => state.user)
console.log("USERRRRR", user)

  // useEffect(() => {
  //   axios.get("http://localhost:3001/api/users/").then((productlist) => {
  //     setProducts(productlist.data);
  //   });
  // }, []);

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://img.icons8.com/ios/344/user-male-circle.png",
          }}
        />
        <Text style={styles.name}>{user.firstName}</Text>
        <Text style={styles.userInfo}>{user.email}</Text>
        <Text style={styles.userInfo}>{`${user.city}, ${user.countryOfResidence}`}</Text>
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
