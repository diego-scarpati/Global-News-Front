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
import AddUserTeam from "./Views/Team/AddUserTeam";
import SelectTeam from "./Views/Team/SelectTeam"
import HREditUser from "./Views/RRHH/HREditUser"; // queda
import { userRequest, sendLoginRequest } from "./store/user"; // queda

const Stack = createNativeStackNavigator();

function App() {
  const [route, setRoute] = useState("Inicio");
  const [userEmail, setUserEmail] = useState("");

  // useEffect(() => {
  //   // try {
  //   //   console.log("entre al try");
  //   //   storage
  //   //     .load({
  //   //       key: "loggedUser",
  //   //       id: "1",
  //   //       autoSync: false,
  //   //       syncInBackground: false,
  //   //     })
  //   //     .then((ret) => {
  //   //       console.log("estoy en el then");
  //   //       setUserEmail(ret.email);
  //   //       setRoute("Pantalla Principal");
  //   //     });
  //   // } catch (error) {
  //   //   console.log("entre al catch");
  //   //   console.warn(error.message);
  //   // }

  //   // No logueo nada este
  //   // try {
  //   //   // NO tira error
  //   //   storage.getIdsForKey("loggedUser").then((ids) => {
  //   //     console.log(ids);
  //   //   });

  //     // Tiran error
  //     // storage.getAllDataForKey('loggedUser').then(users => {
  //     //   console.log("Users:", users);
  //     // });
  //     // storage.getAllDataForKey('1').then(users => {
  //     //   console.log("Users:", users);
  //     // });
  //     // storage.getIdsForKey('1').then(ids => {
  //     //   console.log(ids);
  //     // });
  //   } catch (error) {
  //     console.log("getAllDataForKey", error);
  //   }
  // }, []);
  // console.log("Constants.platform", Constants.platform);
  // console.log("route", route);
  // console.log("userEmail", userEmail);

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
          <Stack.Screen name="Solicitud de Licencias" component={LicenseRequest}/>
          <Stack.Screen name="Historial Licencias" component={LicenseHistory} />
          <Stack.Screen name="Mi Perfil" component={MyProfile} />
          <Stack.Screen name="Dar Presente" component={Attendance} />
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
