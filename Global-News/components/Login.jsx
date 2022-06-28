import React from "react";
import { useDispatch } from "react-redux";

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
import logo from "../assets/gnlogogrande-01.png";
import { NavigationType } from "react-router-native";
import { sendLoginRequest } from "../store/user";


export default function Login({navigation}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email:"",
      password:"",
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (info) =>{
      dispatch(sendLoginRequest (info))
      navigation.navigate('HomeScreen')
    }

  return (
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
            placeholder="Email"
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
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
      {errors.password && <Text>This is required.</Text>}

      <Button title="Submit" 
      onPress={  handleSubmit(onSubmit) }
      />
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
