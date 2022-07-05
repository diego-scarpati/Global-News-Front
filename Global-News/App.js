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
import HRHomeScreen from "./Views/RRHH/HRHomeScreen";
import HomeScreen from "./Views/HomeScreen/HomeScreen";
import Attendance from "./Views/Attendance/Attendance";
import BossHomeScreen from "./Views/Boss/BossHomeScreen"
import StartScreen from "./Views/StartScreen/StartScreen";
import LicenseRequest from "./Views/License/LicenseRequest";
import LicenseHistory from "./Views/License/LicenseHistory";
import HRLicensesHistory from "./Views/RRHH/HRLicencesHistory"
import HRLicensesRequest from "./Views/RRHH/HRLicensesRequest";
import ManagerHomeScreen from "./Views/Manager/ManagerHomeScreen"
import LicensesHomeScreen from "./Views/License/LicensesHomeScreen"
import BossLicencesRequest from "./Views/Boss/BossLicencesRequest";
import CoordinatorLicenses from "./Views/Coordinator/CoordinatorLicenses"
import ManagerLicencesRequest from "./Views/Manager/ManagerLicensesRequest"
import CoordinatorHomeScreen from "./Views/Coordinator/CoordinatorHomeScreen"

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

          <Stack.Screen name="Coordinador" component={CoordinatorHomeScreen} />
          <Stack.Screen name="Coordinador Licencias de Equipo" component={CoordinatorLicenses} />

          <Stack.Screen name="Jefe" component={BossHomeScreen} />
          <Stack.Screen name="Jefe Solicitud de Licencias" component={BossLicencesRequest} />

          <Stack.Screen name="Gerente" component={ManagerHomeScreen} />
          <Stack.Screen name="Gerente Solicitud de Licencias" component={ManagerLicencesRequest} />

          <Stack.Screen name="Recursos Humanos Editar Usuario" component={HREditUser} />
          <Stack.Screen name="Recursos Humanos Promover Empleado" component={HRGiveRol} />
          <Stack.Screen name="Recursos Humanos" component={HRHomeScreen} />
          <Stack.Screen name="Recursos HumanosSolicitud de Licencias" component={HRLicensesRequest}/>
          <Stack.Screen name="Recursos HumanosHistorial de Licencias" component={HRLicensesHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
