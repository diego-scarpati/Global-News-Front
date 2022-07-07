import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, Button, StyleSheet, TextInput } from "react-native";
import storage from "../../storage/storage";
import Constants from "expo-constants";
import logo from "../../assets/gnlogogrande-01.png";
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

  console.log("Web", Constants.platform.web != null)
  const onSubmit = (info) => {
    dispatch(sendLoginRequest(info));
    
    if (Constants.platform?.web) {
      localStorage.setItem("email", JSON.stringify(info.email))
    } else {
      storage.save({
        key: "loggedUser",
        id: "1",
        data: info,
        // expires: 1000 * 3600,
      });
    }
    navigation.replace("Pantalla Principal");
  };

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

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
    width: 250,
    justifyContent: "center",
  },
});
