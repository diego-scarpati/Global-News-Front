import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";


import Profile from "./components/Profile";
import HomeButton from "./components/HomeButtons";


export default function UserProfileView({navigation}) {
    const user = useSelector((state) => state.user)
    
  return (
    <ScrollView style={styles.container}>
      <Profile />
      <View style={styles.body}>
        <HomeButton text="Mis Datos"                         onPress={()=>navigation.navigate("MyProfile")}/>
        <HomeButton text="Licencias"                         onPress={()=>navigation.navigate("License")}/>
        <HomeButton text="Equipos"                           onPress={()=>navigation.navigate("Team")}/> 
        <HomeButton text="Presentismo"                       onPress={()=>navigation.navigate("Attendance")}/>
        {(user.RRHH)&& <HomeButton text="Recursos Humanos"   onPress={()=>navigation.navigate("Recursos Humanos")}/>}
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#f89d1e",
    height: 700,
    alignItems: "center",
  }
});
