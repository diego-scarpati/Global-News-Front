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
  Pressable
} from "react-native";
import storage from "../../storage/storage";
import styles from "../../styles/login";

import logo from "../../assets/gnlogogrande-01.png";
import image from "../../assets/background-startScreen-02.png";
import { sendLoginRequest } from "../../store/user";

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

  const dispatch = useDispatch();

  const onSubmit = (info) => {
    dispatch(sendLoginRequest(info));
    // console.log("🚀 ~ file: Login.jsx ~ line 26 ~ onSubmit ~ info", info)

    storage.save({
      key: "loggedUser",
      id: "1",
      data: info,
      // expires: 1000 * 3600,
    });
    navigation.replace("Pantalla Principal");
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
          <Text style={styles.text}>SUBMIT</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

