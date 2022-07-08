import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, sendLoginRequest } from "../../store/user";
import logo from "../../assets/gnlogogrande-01.png";
import storage from "../../storage/storage";

const Loading = ({ navigation }) => {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Platform.OS === "web") {
      if (JSON.parse(localStorage.getItem("email")) !== null) {
        dispatch(setUser());
        navigation.replace("Pantalla Principal");
      } else {
        navigation.replace("Inicio");
      }
    } else {
      try {
        storage
          .load({
            key: "loggedUser",
            id: "1",
            // autoSync: false,
            // syncInBackground: false,
          })
          .then((ret) => {
            console.log("ret", ret)
            dispatch(sendLoginRequest({ email: ret.email }));
            navigation.replace("Pantalla Principal");
          });
      } catch (error) {
        console.log("entre al catch");
        console.warn(error.message);
        navigation.replace("Inicio");
      }
      // navigation.replace("Inicio");
      try {
        // NO tira error
        storage.getIdsForKey("loggedUser").then((ids) => {
          console.log(ids);
        });
      } catch (error) {
        console.log("getAllDataForKey", error);
      }
    }
  }, []);

  return (
    <View style={styles.contaier}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <ActivityIndicator size="large" color="#0073b7" />
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    height: 100,
    width: 200,
  },
});
