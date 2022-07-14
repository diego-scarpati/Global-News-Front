import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TextInput,
  Modal,
  ImageBackground,
  Platform,
  } from "react-native";
import logo from "../../assets/gnlogogrande-01.png";

import { sendRegisterRequest } from "../../store/user";
import { getToken } from "../../utils/notifications";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "../HomeScreen/components/HomeButtons";
import { setDate } from "../../utils/getDate";

export default function Register({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalId: "",
      birthday: "",
      email: "",
      phoneNumber: "",
      countryOfResidence: "",
      city: "",
      address: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const onSubmit = async (info) => {
    info.birthday = setDate(info.birthday);

    if (Platform.OS === "web") {
      dispatch(sendRegisterRequest(info));
    } else {
      const token = await getToken(); //hay que usar expo start para que funcione.
      const registerInfo = { ...info, expoToken: token };
      dispatch(sendRegisterRequest(registerInfo));
    }
    navigation.navigate("Inicio Sesion");
  };

  const allowOnlyNumbers = (value) => {
    return value.replace(/[A-Za-z ]+$/g, "");
  };

  const allowOnlyLetters = (value) => {
    return value.replace(/[0-9]*$/, "");
  };
  

  return (
    <ScrollView>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.title}>Registrarse</Text>
          <View>
            <View style={styles.editar}>
              <Text style={styles.text}>Nombre:</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(allowOnlyLetters(text))}
                    value={value}
                    placeholder="Nombre"
                  />
                )}
                name="firstName"
              />
              {errors.firstName && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Apellido:</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(allowOnlyLetters(text))}
                    value={value}
                    placeholder="Apellido"
                  />
                )}
                name="lastName"
              />
              {errors.lastName && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>DNI:</Text>
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
                    placeholder="DNI"
                  />
                )}
                name="nationalId"
              />
              {errors.nationalId && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Fecha de nacimiento:</Text>
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
                    placeholder="DD/MM/AAAA"
                  />
                )}
                name="birthday"
              />
              {errors.birthday && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Email:</Text>
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
                    placeholder="Email"
                  />
                )}
                name="email"
              />
              {errors.email && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Telefono:</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(allowOnlyNumbers(text))}
                    value={value}
                    placeholder="Telefono"
                  />
                )}
                name="phoneNumber"
              />
              {errors.phoneNumber && <Text>Campo Requerido.</Text>}
            </View>

            <View style={styles.editar}>
              <Text style={styles.text}>Pais:</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(allowOnlyLetters(text))}
                    value={value}
                    placeholder="Pais"
                  />
                )}
                name="countryOfResidence"
              />
              {errors.countryOfResidence && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Ciudad:</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(allowOnlyLetters(text))}
                    value={value}
                    placeholder="Ciudad"
                  />
                )}
                name="city"
              />
              {errors.city && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Direccion:</Text>
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
                    defaultValue={value}
                    placeholder="Direccion"
                  />
                )}
                name="address"
              />
              {errors.address && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Password:</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={value}
                    placeholder="Password"
                  />
                )}
                name="password"
              />
              {errors.password && <Text>Campo Requerido.</Text>}
            </View>
          </View>

          <HomeButton text={"Enviar"} onPress={handleSubmit(onSubmit)} />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    color: "#ffff",
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    minHeight: 700,
  },
  input: {
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 210,
    backgroundColor: "#ffff",
  },
  editar: {
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#ffff",
    fontWeight: "bold",
  },
});
