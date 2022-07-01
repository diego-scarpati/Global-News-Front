import React,{ useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import { sendHistoyLicensesRequest } from "../../store/license"



export default function RrHh() {
  const dispatch = useDispatch();
  const licencias = useSelector((state) => state.license);
  useEffect(() => {dispatch(sendHistoyLicensesRequest())},[])

  console.log("LicensesJSX",licencias)


  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text>Hola!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0073b7",
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#f89d1e",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    marginTop: 5,
  },
});
