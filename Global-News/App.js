import { Provider, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import storage from "./storage/storage";
import store from "./store/store";
import Constants from "expo-constants";

import Team from "./Views/Team/Team";
import Login from "./Views/Login/Login";
import HRGiveRol from "./Views/RRHH/HRGiveRol";
import HREditUser from "./Views/RRHH/HREditUser";
import Calendar from "./Views/Calendar/Calendar";
import Register from "./Views/Register/Register";
import MyProfile from "./Views/MyProfile/MyProfile";
import HRHomeScreen from "./Views/RRHH/HRHomeScreen";
import HomeScreen from "./Views/HomeScreen/HomeScreen";
import Attendance from "./Views/Attendance/Attendance";
import BossHomeScreen from "./Views/Boss/BossHomeScreen";
import StartScreen from "./Views/StartScreen/StartScreen";
import LicenseRequest from "./Views/License/LicenseRequest";
import LicenseHistory from "./Views/License/LicenseHistory";
import HRLicensesHistory from "./Views/RRHH/HRLicencesHistory";
import HRLicensesRequest from "./Views/RRHH/HRLicensesRequest";
import ManagerHomeScreen from "./Views/Manager/ManagerHomeScreen";
import BossLicencesRequest from "./Views/Boss/BossLicencesRequest";
import HREditUser from "./Views/RRHH/HREditUser"; // queda
import { userRequest, sendLoginRequest } from "./store/user"; // queda
import LicensesHomeScreen from "./Views/License/LicensesHomeScreen";
import BossAttendanceControl from "./Views/Boss/BossAttendanceControl";
import AttendanceControler from "./Views/Attendance/AttendanceControler";
import CoordinatorLicenses from "./Views/Coordinator/CoordinatorLicenses";
import ManagerLicencesRequest from "./Views/Manager/ManagerLicensesRequest";
import CoordinatorHomeScreen from "./Views/Coordinator/CoordinatorHomeScreen";

const Stack = createNativeStackNavigator();

function App() {
  const [route, setRoute] = useState("Inicio");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    try {
      console.log("entre al try");
      storage
        .load({
          key: "loggedUser",
          id: "1",
          autoSync: false,
          syncInBackground: false,
        })
        .then((ret) => {
          console.log("estoy en el then");
          setUserEmail(ret.email);
          setRoute("Pantalla Principal");
        });
    } catch (error) {
      console.log("entre al catch");
      console.warn(error.message);
    }

    // No logueo nada este
    try {
      // NO tira error
      storage.getIdsForKey("loggedUser").then((ids) => {
        console.log(ids);
      });

      // Tiran error
      // storage.getAllDataForKey('loggedUser').then(users => {
      //   console.log("Users:", users);
      // });
      // storage.getAllDataForKey('1').then(users => {
      //   console.log("Users:", users);
      // });
      // storage.getIdsForKey('1').then(ids => {
      //   console.log(ids);
      // });
    } catch (error) {
      console.log("getAllDataForKey", error);
    }
  }, []);
  console.log("Constants.platform", Constants.platform);
  console.log("route", route);
  console.log("userEmail", userEmail);

  function Loading({ navigation }) {
    const dispatch = useDispatch();
    useEffect(() => {
      setTimeout(() => {
        console.log("email", userEmail);
        userEmail && dispatch(sendLoginRequest({ email: userEmail }));
        console.log("route", route);
        console.log("Por redirigir");
        navigation.replace(route);
      }, 1000);
    }, []);

    return (
      <View>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

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
          <Stack.Screen
            name="Solicitud de Licencias"
            component={LicenseRequest}
          />
          <Stack.Screen name="Historial Licencias" component={LicenseHistory} />

          <Stack.Screen name="Mi Perfil" component={MyProfile} />

          <Stack.Screen name="Dar Presente" component={Attendance} />

          <Stack.Screen name="Equipo" component={Team} />

          <Stack.Screen name="Calendario" component={Calendar} />

          <Stack.Screen
            name="Control Asistencias"
            component={AttendanceControler}
          />

          <Stack.Screen name="Coordinador" component={CoordinatorHomeScreen} />
          <Stack.Screen
            name="Coordinador Licencias de Equipo"
            component={CoordinatorLicenses}
          />
          <Stack.Screen name="Jefe" component={BossHomeScreen} />
          <Stack.Screen
            name="Jefe Solicitud de Licencias"
            component={BossLicencesRequest}
          />
          <Stack.Screen name="Asistencias" component={BossAttendanceControl} />
          <Stack.Screen name="Gerente" component={ManagerHomeScreen} />
          <Stack.Screen
            name="Gerente Solicitud de Licencias"
            component={ManagerLicencesRequest}
          />
          <Stack.Screen
            name="Recursos Humanos Editar Usuario"
            component={HREditUser}
          />
          <Stack.Screen
            name="Recursos Humanos Promover Empleado"
            component={HRGiveRol}
          />
          <Stack.Screen name="Recursos Humanos" component={HRHomeScreen} />
          <Stack.Screen
            name="Recursos HumanosSolicitud de Licencias"
            component={HRLicensesRequest}
          />
          <Stack.Screen
            name="Recursos HumanosHistorial de Licencias"
            component={HRLicensesHistory}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
