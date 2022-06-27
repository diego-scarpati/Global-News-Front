// import { StyleSheet, Text, View } from "react-native";




import MyProfile from "./components/MyProfile/MyProfile"

import License from "./components/License/License"
import { NativeRouter } from "react-router-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from "./components/StartScreen";
import Login from "./components/Login"
import Register from "./components/Register"
import HomeScreen2 from './components/Home/HomeScreen2'


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={StartScreen}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register}/>

      <Stack.Screen name="MyProfile" component={MyProfile}/>

<Stack.Screen name="License" component={License}/>

      <Stack.Screen name ="HomeScreen" component={HomeScreen2}/>


      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

