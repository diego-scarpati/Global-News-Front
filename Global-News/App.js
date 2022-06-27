// import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar'
import StartScreen from "./components/StartScreen";
import Login from "./components/Login"
import Register from "./components/Register"
import MyProfile from "./components/MyProfile/MyProfile"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={StartScreen}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="MyProfile" component={MyProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

