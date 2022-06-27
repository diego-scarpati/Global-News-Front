import React from "react";
import { StyleSheet, View } from "react-native";
import Profile from "./components/Profile";
import HomeButton from "./components/HomeButtons";

export default function UserProfileView() {
    


  return (
    <View style={styles.container}>
      <Profile />
      <View style={styles.body}>
        <HomeButton />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#f89d1e",
    height: 500,
    alignItems: "center",
  }
});
