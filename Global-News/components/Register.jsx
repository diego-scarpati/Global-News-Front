import React from "react";
import { View, Text, Image, Button, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import logo from "../assets/gnlogogrande-01.png";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import axios from "axios"
import { sendRegisterRequest } from "../store/user";

export default function Register({navigation}) {

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

  const onSubmit = (info) =>{
    console.log("Prueba INFO", info);
      dispatch(sendRegisterRequest (info))
      navigation.navigate('Login')
    }

  return (
    <ScrollView>
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
              onChangeText={onChange}
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
              onChangeText={onChange}
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
              value={value}
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
              placeholder="Telefono"
            />
          )}
          name="phoneNumber"
        />
        {errors.phoneNumber && <Text>Campo requerido.</Text>}
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
              placeholder="Birth Date"
              options={{
                format: 'DD-MM-YYYY'
              }}
            />
          )}
          name="birthday"
        />
        {errors.birthday && <Text>Campo requerido.</Text>}

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
              onChangeText={onChange}
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
              placeholder="Contraseña"
              secureTextEntry={true}
            />
          )}
          name="password"
        />
        {errors.password && <Text>Campo requerido.</Text>}

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
  
});
