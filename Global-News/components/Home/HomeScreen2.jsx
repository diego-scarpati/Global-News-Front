import React from "react";
import { StyleSheet, View } from "react-native";
import Profile from "./components/Profile";
import MyProfile from "../MyProfile/MyProfile"
import HomeButton from "./components/HomeButtons";

export default function UserProfileView({navigation}) {
    


  return (
    <View style={styles.container}>
      <Profile />
      <View style={styles.body}>
        <HomeButton text="Mis Datos" img="https://img.icons8.com/ios/344/resume.png" onPress={()=>navigation.navigate("MyProfile")}/>
        <HomeButton text="Licencias" img="https://img.icons8.com/material-outlined/344/chrome-reader-mode.png" onPress={()=>navigation.navigate("License")}/>
        <HomeButton text="Presentismo" img="https://img.icons8.com/small/344/document.png" onPress={()=>navigation.navigate("Attendance")}/>
        <HomeButton text="Equipos" img="https://img.icons8.com/small/344/conference.png" onPress={()=>navigation.navigate("Team")}/> 
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
