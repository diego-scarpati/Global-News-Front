import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from "react-native";
import Section from "./component/Section";
import BossSection from "./component/BossSection";
import { useDispatch, useSelector } from "react-redux";
import image from "../../assets/background-startScreen-02.png";

export default function HRLicensesRequest() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.mainText}>Licencias</Text>
        {user.RRHH ? <Section /> : <BossSection />}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
    justifyContent: "center",
    alignContent: "center",
    padding: 5,
    // margin: 5,
  },
  mainText: {
    fontSize: 22,
    // fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    marginTop: 5,
  },
  infoContent: {
    // flex: 1,
    alignItems: "flex-start",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 600,
    width: "100%",
    minHeight: 700,
  },
  buttonOff: {
    margin: 2,
    backgroundColor: "#a2a2a2",
    borderColor: "white",
    borderRadius: 30,
    width: 300,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
