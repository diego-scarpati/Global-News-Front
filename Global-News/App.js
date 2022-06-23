// import { StyleSheet, Text, View } from "react-native";
import StartScreen from "./components/StartScreen";
import Login from "./components/Login"
import { NativeRouter } from "react-router-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={StartScreen}
      />
        <Stack.Screen
        name="Login"
        component={Login}
      />
         {/* <Stack.Screen
        name="Register"
        component={Register}
      /> */}
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
