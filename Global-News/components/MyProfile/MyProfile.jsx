import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// import { Link, Redirect, Route, Switch } from 'react-router-native'
import { useForm, Controller } from "react-hook-form";
import logo from "../../assets/gnlogogrande-01.png";
import { ScrollView } from "react-native-gesture-handler";

export default function Register() {
  const {control, handleSubmit, formState: { errors },} = useForm({
    defaultValues: {
      firstName: "Mariano",
      lastName: "Imhoff",
      nationalId: "34749456",
      email: "imhmariano@gmail.com",
      phoneNumber: "1161918486",
      birthday: "23/01/1990",
      address: "Av. Juan Bautista Alberdi 6419",
      countryOfResidence: "Argentina",
      shift: "Mañana",
      startDate: "01/01/2017",
      workingDays: "Lu/Ma/Mi/Ju/Vi",
      available: "Si",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <ScrollView>
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.logo} />
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
      placeholder="Nombre"
    />
  )}
  name="firstName"
/>
{errors.firstName && <Text>This is required.</Text>}
<Button title="editar"/>
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
      placeholder="Apellido"
    />
  )}
  name="lastName"
/>
{errors.lastName && <Text>This is required.</Text>}
<Button title="editar"/>
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
      placeholder="DNI"
    />
  )}
  name="nationalId"
/>
{errors.nationalId && <Text>This is required.</Text>}
<Button title="editar"/>
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
<Button title="editar"/>
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
<Button title="editar"/>
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
      placeholder="Cumpleaños"
    />
  )}
  name="birthday"
/>
{errors.birthday && <Text>This is required.</Text>}
<Button title="editar"/>
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
      placeholder="Pais"
    />
  )}
  name="countryOfResidence"
/>
{errors.countryOfResidence && <Text>This is required.</Text>}
<Button title="editar"/>
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
      placeholder="Turno Laboral"
    />
  )}
  name="shift"
/>
{errors.shift && <Text>This is required.</Text>}
<Button title="editar"/>
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
      placeholder="Inicio Laboral"
    />
  )}
  name="startDate"
/>
{errors.startDate && <Text>This is required.</Text>}
<Button title="editar"/>
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
      placeholder="Dias Laborales"
    />
  )}
  name="workingDays"
/>
{errors.workingDays && <Text>This is required.</Text>}
<Button title="editar"/>
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
      placeholder="Disponibilidad"
    />
  )}
  name="available"
/>
{errors.available && <Text>This is required.</Text>}
<Button title="editar"/>
</View>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  </ScrollView>
  )
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




