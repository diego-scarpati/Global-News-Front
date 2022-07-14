import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TextInput,
  ImageBackground,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import storage from "../../storage/storage";
import axios from "axios";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import logo from "../../assets/gnlogogrande-01.png";
import { sendLoginRequest, setUserFromLogin } from "../../store/user";
import image from "../../assets/background-startScreen-02.png";

export default function Login({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setItem } = useAsyncStorage("@storage_key");
  const writeItemToStorage = async (newValue) => {
    const jsonValue = JSON.stringify({ email: newValue });
    await setItem(jsonValue);
  };
  const dispatch = useDispatch();

  const onSubmit = async (info) => {
    try {
      const loggedUser = await axios.post(
        `http://localhost:3001/api/auth/logIn`,
        info
      )
      dispatch(setUserFromLogin(loggedUser?.data?.dataValues))
      if (Platform.OS === "web") {
        localStorage.setItem("email", JSON.stringify(info.email));
      } else {
        writeItemToStorage(info.email);
      }
      navigation.replace("Pantalla Principal");
    } catch (error) {
      if (Platform.OS === "web") {
        window.alert("Email o contraseña incorrectas");
      } else {
        Alert.alert("Error de LogIn", "Email o contraseña incorrectas");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
          <Image source={logo} style={styles.logo} />
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toLowerCase()}
              placeholder="Email"
            />
          )}
          name="email"
        />
        {errors.email && <Text>Campo requerido.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry={true}
            />
          )}
          name="password"
        />
        {errors.password && <Text>Campo requerido.</Text>}

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.text}>Ingresar</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  logo: {
    height: 100,
    width: 250,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    minHeight: 700,
  },
  button: {
    margin: 2,
    backgroundColor: "#0073b7",
    borderColor: "white",
    borderRadius: 30,
    width: 170,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
