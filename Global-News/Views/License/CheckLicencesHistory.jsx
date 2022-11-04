import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Button,
  Pressable,
  ImageBackground,
} from "react-native";
import { hrLicenseBySearch } from "../../store/hr";
import SearchInput from "../Search/SearchInput";
import { searchTeamById } from "../../store/team";
import { hrSendHistoyLicensesRequest } from "../../store/hr";
import image from "../../assets/background-startScreen-02.png";

export default function HRLicencesHistory({ navigation }) {
  const dispatch = useDispatch();
  const licencias = useSelector((state) => state.hr);
  //const user = useSelector((state) => state.license);
  const user = useSelector((state) => state.user);

  const onPress = (name, id) => {
    const request = async () => {
      const team = await dispatch(searchTeamById(id));
      const license = await dispatch(
        hrSendHistoyLicensesRequest({ userId: id })
      );
      navigation.navigate("Busqueda por Usuario", {
        name,
        LicenseHistory: true,
      });
    };
    request();
  };

  return user.RRHH ? (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>   Busqueda por Usuario   </Text>
        <SearchInput dispatchInput={hrLicenseBySearch} />
        <SectionList
          sections={[{ title: "Licencias", data: licencias }]}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.text}>
                Solicitante: {item.user?.firstName} {item.user?.lastName}
              </Text>
              <Text>Legajo: {item.employeeId}</Text>
              <Text>
                {item.user?.positionId === 4 && "Rango: Empleado"}
                {item.user?.positionId === 3 && "Rango: Coordinador"}
                {item.user?.positionId === 2 && "Rango: Jefe"}
                {item.user?.positionId === 1 && "Rango: Gerente"}
              </Text>
              <Text>Tipo de licencia: {item.type}</Text>
              <Text>Inicio: {item.startDate}</Text>
              <Text>Fin: {item.endDate}</Text>
              <Text>Observaciones: {item.observations}</Text>
              <Text>Estado Jefe: {item.bossApproval}</Text>
              <Text>Estado RRHH: {item.HRApproval}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>Equipos</Text>
      {user.teams.length == 0 && <Text>No estas en ningun equipo</Text>}
      <SectionList
        sections={[{ title: "Equipos", data: user.teams }]}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Pressable onPress={() => onPress(item.name, item.id)}>
              <Text style={styles.text}>{item.name}</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    justifyContent: "center",
    alignContent: "center",
    padding: 5,
    margin: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 600,
    width: "100%",
    minHeight: 700,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#0073b7",
    borderWidth: 2,
    margin: 2,
    borderRadius: 5,
  },
  sectionHeader: {
    backgroundColor: "#efefef",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
  buttomView: {
    margin: 10,
  },
  text: {
    fontSize: 20,
  },
  mainText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
    marginTop: 5,
  },
});
