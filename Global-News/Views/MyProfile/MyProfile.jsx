import React from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TextInput,
  ImageBackground,
} from "react-native";
import HomeButton from "../HomeScreen/components/HomeButtons";
import image from "../../assets/background-startScreen-02.png";
import logo from "../../assets/gnlogogrande-01.png";

export default function Register() {
  const user = useSelector((state) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      nationalId: user.nationalId || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      birthday: user.birthday || "",
      address: user.address || "",
      countryOfResidence: user.countryOfResidence || "",
      city: user.city || "",
      shift: user.shift || "",
      startDate: user.startDate || "",
      workingDays: user.workingDays || "",
      available: user.available || "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <ScrollView>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <View>
            <Image source={logo} style={styles.logo} />
          </View>
          <Text style={styles.title}>Mis datos</Text>
          <View style={styles.editar}>
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
                  placeholder="Nombre"
                  editable={user.RRHH}
                />
              )}
              name="firstName"
            />
            {errors.firstName && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
                  placeholder="Apellido"
                  editable={user.RRHH}
                />
              )}
              name="lastName"
            />
            {errors.lastName && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
                  editable={user.RRHH}
                />
              )}
              name="nationalId"
            />
            {errors.nationalId && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
                  placeholder="Fecha de Nacimiento"
                  editable={user.RRHH}
                />
              )}
              name="birthday"
            />
            {errors.birthday && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
                  placeholder="email"
                  editable={user.RRHH}
                />
              )}
              name="email"
            />
            {errors.email && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
                  placeholder="Telefono"
                />
              )}
              name="phoneNumber"
            />
            {errors.phoneNumber && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
                  placeholder="Pais"
                  editable={user.RRHH}
                />
              )}
              name="countryOfResidence"
            />
            {errors.countryOfResidence && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
                  placeholder="Ciudad"
                  editable={user.RRHH}
                />
              )}
              name="city"
            />
            {errors.city && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
            {errors.address && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
                  placeholder="Dias Laborales"
                  editable={user.RRHH}
                />
              )}
              name="workingDays"
            />
            {errors.workingDays && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
                  placeholder="Turno Laboral"
                  editable={user.RRHH}
                />
              )}
              name="shift"
            />
            {errors.shift && <Text>This is required.</Text>}
          </View>
          <View style={styles.editar}>
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
                  placeholder="Inicio Laboral"
                  editable={user.RRHH}
                />
              )}
              name="startDate"
            />
          </View>
          <HomeButton text="Enviar" onPress={handleSubmit(onSubmit)} />
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
  },
  logo: {
    height: 100,
    width: 200,
    justifyContent: "center",
  },
  editar: {
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 17,
    color: "#ffff",
    fontWeight: "bold",
  },
});
