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
} from "react-native";
import logo from "../../assets/gnlogogrande-01.png";
import { sendRegisterRequest } from "../../store/user";
import Calendar from "../Calendar/Calendar";
import image from "../../assets/background-startScreen-02.png";

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
      email: "",
      phoneNumber: "",
      birthday: "",
      address: "",
      city: "",
      password: "",
      countryOfResidence: "",
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (info) => {
    info.birthday = selectedDay.start;
    dispatch(sendRegisterRequest(info));
    navigation.navigate("Inicio Sesion");
  };

  const allowOnlyLetters = (value) => {
    return value.replace(/[0-9]*$/, "");
  };

  const allowOnlyNumbers = (value) => {
    return value.replace(/[A-Za-z ]+$/g, "");
  };


  return (
    <ScrollView>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
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
                onChangeText={(text) => onChange(allowOnlyLetters(text))}
                value={value}
                placeholder="Nombre"
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>Campo requerido.</Text>}
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
          {errors.lastName && <Text>Campo requerido.</Text>}
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
          {errors.nationalId && <Text>Campo requerido.</Text>}
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
                onChangeText={(text) => onChange(allowOnlyNumbers(text))}
                value={value}
                placeholder="Telefono"
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && <Text>Campo requerido.</Text>}
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModalDate}
          >
            <Calendar text={"start"} />
            <Button
              title="Cerrar"
              onPress={() => {
                setShowModalDate(!showModalDate);
              }}
            />
          </Modal>
          <Button
            style={{ marginBottom: 20 }}
            title="Fecha de Nacimiento"
            onPress={() => {
              setShowModalDate(!showModalDate);
            }}
          />
          <View style={styles.input} pointerEvents="none">
            <Text>Fecha: {selectedDay.start} </Text>
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
                onChangeText={(text) => onChange(allowOnlyLetters(text))}
                value={value}
                placeholder="Pais"
              />
            )}
            name="countryOfResidence"
          />
          {errors.countryOfResidence && <Text>Campo requerido.</Text>}
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
          {errors.city && <Text>Campo requerido.</Text>}
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
                placeholder="Direccion"
              />
            )}
            name="address"
          />
          {errors.address && <Text>Campo requerido.</Text>}
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
                placeholder="Contraseña"
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.password && <Text>Campo requerido.</Text>}

          <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
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
  input: {
    borderColor: "gray",
    backgroundColor: "#ffff",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: "row",
  },
  logo: {
    height: 100,
    width: 200,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
