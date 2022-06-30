import React from "react";
import { StyleSheet, View } from "react-native";

import Profile from "./components/Profile";
import HomeButton from "./components/HomeButtons";

export default function UserProfileView({navigation}) {
    
  return (
    <View style={styles.container}>
      <Profile />
      <View style={styles.body}>
        <HomeButton text="Mis Datos"   onPress={()=>navigation.navigate("MyProfile")}/>
        <HomeButton text="Licencias"   onPress={()=>navigation.navigate("License")}/>
        <HomeButton text="Equipos"     onPress={()=>navigation.navigate("Team")}/> 
        <HomeButton text="Presentismo" onPress={()=>navigation.navigate("Attendance")}/>
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
