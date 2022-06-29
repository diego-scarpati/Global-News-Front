// import { StyleSheet, Text, View } from "react-native";
import StartScreen from "./components/StartScreen";
import Login from "./components/Login"
import Register from "./components/Register"
import License from "./components/License/License"
import { NativeRouter } from "react-router-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import store from "./store/store"
import HomeScreen2 from './components/Home/HomeScreen2'
import Team from "./components/Team/Team"
import Attendance from "./components/Attendance/Attendance"
import MyProfile from "./components/MyProfile/MyProfile"
import Calendar from "./components/Calendar/Calendar"

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={StartScreen}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="License" component={License}/>
      <Stack.Screen name ="HomeScreen" component={HomeScreen2}/>
      <Stack.Screen name="MyProfile" component={MyProfile}/>
      <Stack.Screen name="Attendance" component={Attendance}/>
      <Stack.Screen name="Team" component={Team}/>
      <Stack.Screen name="Calendar" component={Calendar}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
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
