import { Provider } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from "./store/store"
import Team from "./Views/Team/Team"
import Boss from "./Views/Boss/Boss"
import Login from "./Views/Login/Login"
import License from "./Views/License/License"
import GiveRolHR from "./Views/RRHH/GiveRolHR"
import Calendar from "./Views/Calendar/Calendar"
import Register from "./Views/Register/Register"
import MyProfile from "./Views/MyProfile/MyProfile"
import HomeScreen from "./Views/HomeScreen/HomeScreen"
import Attendance from "./Views/Attendance/Attendance"
import HumanResources from "./Views/RRHH/HumanResources"
import StartScreen from "./Views/StartScreen/StartScreen";
import LicenseHistory from "./Views/License/LicenseHistory"


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen    name="Inicio"              component={StartScreen}/>
      <Stack.Screen    name="Inicio Sesion"       component={Login}/>
      <Stack.Screen    name="Registro"            component={Register}/>
      <Stack.Screen    name="Licencias"           component={License}/>
      <Stack.Screen    name="Pantalla Principal"  component={HomeScreen}/>
      <Stack.Screen    name="Historial Licencias" component={LicenseHistory}/>
      <Stack.Screen    name="Mi Perfil"           component={MyProfile}/>
      <Stack.Screen    name="Dar Presente"        component={Attendance}/>
      <Stack.Screen    name="Equipo"              component={Team}/>
      <Stack.Screen    name="Calendario"          component={Calendar}/>
      <Stack.Screen    name="Recursos Humanos"    component={HumanResources}/>
      <Stack.Screen    name="Promover Empleado"   component={GiveRolHR}/>
      <Stack.Screen    name="Jefe"                component={Boss}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
