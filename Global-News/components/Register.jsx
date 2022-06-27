import React from "react";
import { View, Text, Image, Button, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import logo from "../assets/gnlogogrande-01.png";
import { ScrollView } from "react-native-gesture-handler";

export default function Register() {
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
      password: "",
      countryOfResidence: "",
    },
  });
  const onSubmit = (data) => console.log(data);

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
          name="Nombre"
        />
        {errors.firstName && <Text>This is required.</Text>}

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
              placeholder="Last Name"
            />
          )}
          name="lastName"
        />
        {errors.lastName && <Text>This is required.</Text>}
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
              placeholder="National Id"
            />
          )}
          name="nationalId"
        />
        {errors.nationalId && <Text>This is required.</Text>}
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
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Phone"
            />
          )}
          name="phoneNumber"
        />
        {errors.phoneNumber && <Text>This is required.</Text>}
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
              placeholder="Birth Date"
            />
          )}
          name="birthday"
        />
        {errors.birthday && <Text>This is required.</Text>}

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
              placeholder="Address"
            />
          )}
          name="address"
        />

        {errors.address && <Text>This is required.</Text>}
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
              placeholder="Country of Residence"
            />
          )}
          name="countryOfResidence"
        />
        {errors.countryOfResidence && <Text>This is required.</Text>}
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
