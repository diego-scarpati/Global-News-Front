import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  ImageBackground,
} from "react-native";
import { sendHistoyLicensesRequest } from "../../store/license";
import image from "../../assets/background-startScreen-02.png";

export default function RrHh() {
  const dispatch = useDispatch();
  const licencias = useSelector((state) => state.license);
  useEffect(() => {
    dispatch(sendHistoyLicensesRequest());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SectionList
          sections={[{ title: "Historial licencias", data: licencias }]}
          renderItem={({ item }) => (
            <View style={styles.row}>
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
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignContent: "center",
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
    borderColor: "#d0d0d0",
    borderWidth: 2,
    margin: 10,
    borderRadius: 5,
  },
  sectionHeader: {
    backgroundColor: "#efefef",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    minHeight: 700,
  },
});
