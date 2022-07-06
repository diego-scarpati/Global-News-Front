import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import store from "./store/store";
import Team from "./Views/Team/Team";
import Login from "./Views/Login/Login";
import HRGiveRol from "./Views/RRHH/HRGiveRol";
import HREditUser from "./Views/RRHH/HREditUser"
import Calendar from "./Views/Calendar/Calendar";
import Register from "./Views/Register/Register";
import MyProfile from "./Views/MyProfile/MyProfile";
import VipHomeScreen from "./Views/HomeScreen/VipHomeScreen";
import HomeScreen from "./Views/HomeScreen/HomeScreen";
import Attendance from "./Views/Attendance/Attendance";
import StartScreen from "./Views/StartScreen/StartScreen";
import LicenseRequest from "./Views/License/LicenseRequest";
import LicenseHistory from "./Views/License/LicenseHistory";
import CheckLicensesHistory from "./Views/License/CheckLicencesHistory"
import CheckLicenseRequest from "./Views/License/CheckLicensesRequest";
import LicensesHomeScreen from "./Views/License/LicensesHomeScreen"
import SearchUserAttendanceControl from "./Views/Attendance/SearchUserAttendanceControl"
import AttendanceControler from "./Views/Attendance/AttendanceControler"



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={StartScreen} />
          <Stack.Screen name="Inicio Sesion" component={Login} />
          <Stack.Screen name="Registro" component={Register} />
          <Stack.Screen name="Pantalla Principal" component={HomeScreen} />
          <Stack.Screen name="Licencias" component={LicensesHomeScreen} />
          <Stack.Screen name="Solicitud de Licencias" component={LicenseRequest} />
          <Stack.Screen name="Historial Licencias" component={LicenseHistory} />
          <Stack.Screen name="Mi Perfil" component={MyProfile} />
          <Stack.Screen name="Dar Presente" component={Attendance} />
          <Stack.Screen name="Equipo" component={Team} />
          <Stack.Screen name="Calendario" component={Calendar} />
          <Stack.Screen name="Control Asistencias" component={AttendanceControler} />
          <Stack.Screen name="Control Solicitud de Licencias" component={CheckLicenseRequest}/>
          <Stack.Screen name="Asistencias" component={SearchUserAttendanceControl} />
          <Stack.Screen name="Historial de licencias de empleados" component={CheckLicensesHistory}/>
          <Stack.Screen name="Vista Principal" component={VipHomeScreen} />

          <Stack.Screen name="Recursos Humanos Editar Usuario" component={HREditUser} />
          <Stack.Screen name="Recursos Humanos Promover Empleado" component={HRGiveRol} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
