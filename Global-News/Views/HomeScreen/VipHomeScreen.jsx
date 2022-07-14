import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "./components/HomeButtons";
import { Badge } from "react-native-paper";
import axios from "axios";
import licenseReducer from "../../store/license";
import { hrLicensesReviewLicense } from "../../store/hrLicenses";

export default function HRHomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const license = useSelector((state) => state.hrLicenses);
  

  useEffect(() => {
    dispatch(hrLicensesReviewLicense({ id: user.id }));
  }, []);
  //chequear si con la persistencia de usuario, tambien persiten los botones

  let contBoss = 0;
  let contHR = 0;
  {
    license.length > 0 &&
      license.map((lic) => {
        if (lic.HRApproval === "pending" && lic.bossApproval === "approved") {
          contHR++;
        }
        if (lic.bossApproval === "pending") {
          contBoss++;
        }
        return contBoss, contHR;
      });
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.body}>
          <HomeButton
            text="Control asistencias"
            onPress={() => navigation.navigate("Buscar Usuario")}
          />
         <View>
            <View style={styles.algo}>
              {!user.RRHH && contBoss > 0 && (
                <Badge style={styles.badge} size={30}>
                  {contBoss}
                </Badge>
              )}

              {user.RRHH && contHR > 0 && (
                <Badge style={styles.badge} size={30}>
                  {contHR}
                </Badge>
              )}
            </View>
            <HomeButton
              text="Control solicitud de licencias"
              onPress={() =>
                {navigation.navigate(user.RRHH?"Control Solicitud de Licencias":"Solicitud Licencias")}
              }
            />
          </View>
          <HomeButton
            text="Historial de licencias de empleados"
            onPress={() =>
              navigation.navigate("Historial de licencias de empleados")
            }
          />

          {user.RRHH && (
            <View style={styles.body}>
              <HomeButton
                text="Editar datos de usuario"
                onPress={() =>
                  navigation.navigate("Recursos Humanos Seleccionar Usuario")
                }
              />
              <HomeButton
                text="Promover usuario"
                onPress={() =>
                  navigation.navigate("Recursos Humanos Promover Empleado")
                }
              />
              <HomeButton
                text="Sumar usuario al equipo"
                onPress={() => navigation.navigate("Sumar Empleado al Equipo")}
              />
              <HomeButton
                text="Sumar usuario a la oficina"
                onPress={() =>
                  navigation.navigate("Sumar Empleado a la Oficina")
                }
              />
              <HomeButton
                text="Crear equipo"
                onPress={() => navigation.navigate("Crear Equipo")}
              />
              <HomeButton
                text="Crear oficina"
                onPress={() => navigation.navigate("Crear Oficina")}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  body: {
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 700,
    width: "100%",
  },
  algo: {
    flexDirection: "column",
    alignSelf: "center",
    marginTop: 10,
  },
  badge: {
    alignItems: "center",
  },
});
