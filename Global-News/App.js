// import { StyleSheet, Text, View } from "react-native";
import StartScreen from "./components/StartScreen";
import Login from "./components/Login"
import Register from './components/Register'
import { NativeRouter } from "react-router-native";
import { NavigationContainer } from "@react-navigation/native";
<<<<<<< HEAD
import { createNativeStackNavigator } from '@react-navigation/native-stack';
=======
import { createStackNavigator } from "@react-navigation/stack";
>>>>>>> f4724e1973c65301b3a8af1b41e83337eaee1211

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Home'>
      <Stack.Screen
        name="Home"
        component={StartScreen}
      />
        <Stack.Screen
        name="Login"
        component={Login}
      />
         <Stack.Screen
        name="Register"
        component={Register}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
