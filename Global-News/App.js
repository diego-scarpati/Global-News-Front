import { Provider, useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./store/store";
import Team from "./Views/Team/Team";
import Login from "./Views/Login/Login";
import HRGiveRol from "./Views/RRHH/HRGiveRol";
import Calendar from "./Views/Calendar/Calendar";
import Register from "./Views/Register/Register";
import MyProfile from "./Views/MyProfile/MyProfile";
import VipHomeScreen from "./Views/HomeScreen/VipHomeScreen";
import CreateTeam from "./Views/Team/CreateTeam"
import HomeScreen from "./Views/HomeScreen/HomeScreen";
import Attendance from "./Views/Attendance/Attendance";
import StartScreen from "./Views/StartScreen/StartScreen";
import LicenseRequest from "./Views/License/LicenseRequest";
import LicenseHistory from "./Views/License/LicenseHistory";
import CheckLicensesHistory from "./Views/License/CheckLicencesHistory"
import CheckLicenseRequest from "./Views/License/CheckLicensesRequest";
import LicensesHomeScreen from "./Views/License/LicensesHomeScreen"
import SearchUser from "./Views/Attendance/SearchUser"
import AttendanceControler from "./Views/Attendance/AttendanceControler"
import TeamsHome from "./Views/Team/TeamsHome";
import AddUserTeam from "./Views/Team/AddUserTeam";
import SelectTeam from "./Views/Team/SelectTeam"
import HREditUser from "./Views/RRHH/HREditUser";
import Loading from "./Views/Login/Loading";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Loading}>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Inicio" component={StartScreen} />
          <Stack.Screen name="Inicio Sesion" component={Login} />
          <Stack.Screen name="Registro" component={Register} />
          <Stack.Screen name="Pantalla Principal" component={HomeScreen} />
          <Stack.Screen name="Licencias" component={LicensesHomeScreen} />
          <Stack.Screen name="Solicitud de Licencias" component={LicenseRequest}/>
          <Stack.Screen name="Historial Licencias" component={LicenseHistory} />
          <Stack.Screen name="Mi Perfil" component={MyProfile} />
          <Stack.Screen name="Dar Presente" component={Attendance} />
          <Stack.Screen name="Equipos" component={TeamsHome} />
          <Stack.Screen name="Equipo" component={Team} />
          <Stack.Screen name="Crear Equipo" component={CreateTeam} />
          <Stack.Screen name="Sumar Empleado al Equipo" component={AddUserTeam} />
          <Stack.Screen name="Elegir Equipo" component={SelectTeam} />
          <Stack.Screen name="Calendario" component={Calendar} />
          <Stack.Screen name="Control Asistencias" component={AttendanceControler} />
          <Stack.Screen name="Control Solicitud de Licencias" component={CheckLicenseRequest}/>
          <Stack.Screen name="Buscar Usuario" component={SearchUser} />
          <Stack.Screen name="Historial de licencias de empleados" component={CheckLicensesHistory}/>
          <Stack.Screen name="Vista Principal" component={VipHomeScreen} />
          <Stack.Screen name="Recursos Humanos Editar Usuario" component={HREditUser} />
          <Stack.Screen name="Recursos Humanos Promover Empleado" component={HRGiveRol} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;