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
import {
  setUser,
  sendLoginRequest,
  sendLoginRequestMobile,
} from "../../store/user";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const Loading = ({ navigation }) => {
  const dispatch = useDispatch();
  const { getItem, setItem } = useAsyncStorage("@storage_key");
  const readItem = () => {
    const readItemFromStorage = async () => {
      const jsonValue = await getItem();
      if (jsonValue) {
        const { email } = JSON.parse(jsonValue);
        return email !== null ? email : null;
      } else {
        return null;
      }
    };
    return readItemFromStorage();
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      if (JSON.parse(localStorage.getItem("email")) !== null) {
        dispatch(setUser());
        navigation.replace("Pantalla Principal");
      } else {
        navigation.replace("Inicio");
      }
    } else {
      // try {
      //   storage
      //     .load({
      //       key: "user",
      //       // id: 1,
      //       // autoSync: false,
      //       // syncInBackground: false,
      //     })
      //     .then((ret) => {
      //       console.log("ret", ret);
      //       dispatch(sendLoginRequest({ email: ret.email }));
      //       navigation.replace("Pantalla Principal");
      //     });
      //   } catch (error) {
      //     console.warn(error.message);
      //     navigation.replace("Inicio");
      //   }
      // navigation.replace("Pantalla Principal");
      readItem()
        .then((res) => {
          if (!res) {
            navigation.replace("Inicio");
          } else {
            dispatch(sendLoginRequestMobile(res));
            navigation.replace("Pantalla Principal");
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <View style={styles.container}>
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
    alignContent: "center",
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    height: 100,
    width: 200,
  },
});
