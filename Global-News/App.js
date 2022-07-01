import { Provider } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from "./store/store"
import Team from "./Views/Team/Team"
import RrHh from "./Views/RRHH/RrHh"
import Login from "./Views/Login/Login"
import License from "./Views/License/License"
import Calendar from "./Views/Calendar/Calendar"
import Register from "./Views/Register/Register"
import MyProfile from "./Views/MyProfile/MyProfile"
import HomeScreen from "./Views/HomeScreen/HomeScreen"
import Attendance from "./Views/Attendance/Attendance"
import StartScreen from "./Views/StartScreen/StartScreen";
import LicenseHistory from "./Views/License/LicenseHistory"


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen    name="Home"              component={StartScreen}/>
      <Stack.Screen    name="Login"             component={Login}/>
      <Stack.Screen    name="Register"          component={Register}/>
      <Stack.Screen    name="License"           component={License}/>
      <Stack.Screen    name="HomeScreen"        component={HomeScreen}/>
      <Stack.Screen    name="LicenseHistory"    component={LicenseHistory}/>
      <Stack.Screen    name="MyProfile"         component={MyProfile}/>
      <Stack.Screen    name="Attendance"        component={Attendance}/>
      <Stack.Screen    name="Team"              component={Team}/>
      <Stack.Screen    name="Calendar"          component={Calendar}/>
      <Stack.Screen    name="RrHh"              component={RrHh}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
