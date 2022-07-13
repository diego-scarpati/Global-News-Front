import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "./components/HomeButtons";
import { Badge } from "react-native-paper";
import axios from "axios";
import licenseReducer from "../../store/license";
import { hrReviewLicense } from "../../store/hr";

export default function HRHomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const license = useSelector((state) => state.hr);
  console.log(
    "🚀 ~ filedasdasdsad: VipHomeScreen.jsx ~ line 11 ~ HRHomeScreen ~ license",
    license
  );

  useEffect(() => {
    dispatch(hrReviewLicense({ id: user.id }));
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
          <View style={styles.algo}>
            <HomeButton
              text="Control solicitud de licencias"
              onPress={() =>
                navigation.navigate("Control Solicitud de Licencias")
              }
            />
            {(!user.RRHH && contBoss > 0) && <Badge style={styles.badge}size={30}>{contBoss}</Badge>}

            {(user.RRHH && contHR > 0 )&& <Badge style={styles.badge} size={30}>{contHR}</Badge>}
            
          </View>
          <HomeButton
            text="Control asistencias"
            onPress={() => navigation.navigate("Buscar Usuario")}
          />
          <HomeButton
            text="Historial de licencias de empleados"
            onPress={() =>
              navigation.navigate("Historial de licencias de empleados")
            }
          />
          <HomeButton
            text="Crear equipo"
            onPress={() => navigation.navigate("Crear Equipo")}
          />
          <HomeButton
            text="Sumar empleados al equipo"
            onPress={() => navigation.navigate("Sumar Empleado al Equipo")}
          />

          {user.RRHH && (
            <View style={styles.body}>
              <HomeButton
                text="Promover Empleado"
                onPress={() =>
                  navigation.navigate("Recursos Humanos Promover Empleado")
                }
              />
              <HomeButton
                text="Seleccionar Usuario"
                onPress={() =>
                  navigation.navigate("Recursos Humanos Seleccionar Usuario")
                }
              />
              <HomeButton
                text="Crear Oficina"
                onPress={() => navigation.navigate("Crear Oficina")}
              />
              <HomeButton
                text="Sumar Empleado a la Oficina"
                onPress={() =>
                  navigation.navigate("Sumar Empleado ala Oficina")
                }
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
    height: 600,
    width: "100%",
  },
  algo: {
    flexDirection: "row",
  },
  badge: {
    alignItems: "center",
  },
});
