import React from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import {View,Text,Image,Button,StyleSheet,TextInput} from "react-native";

import logo from "../../assets/gnlogogrande-01.png";
import SearchInput from "../Search/SearchInput";
import { hrSearchUsersByInput } from "../../store/hr"

export default function HREditUser() {
  const user = useSelector((state) => state.hr);
  

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
    <SearchInput dispatchInput={hrSearchUsersByInput}/>
      <View style={styles.container}>
        <View>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text>Mis datos</Text>
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
          <Button title="editar" />
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
          <Button title="editar" />
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
                placeholder="Nombre"
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
                placeholder="Cumpleaños"
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
                placeholder="Pais"
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
                value={value}
                placeholder="Turno Laboral"
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
              />
            )}
            name="startDate"
          />
          {errors.startDate && <Text>This is required.</Text>}
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
                placeholder="Disponibilidad"
              />
            )}
            name="available"
          />
          {errors.available && <Text>This is required.</Text>}
        </View>

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
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
    borderColor: "gray",
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
});
