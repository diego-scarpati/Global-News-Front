import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {View,Text,Button,StyleSheet,TextInput,Modal,ScrollView} from "react-native";
import { officeCreate } from "../../store/office"
import HomeButton from "../HomeScreen/components/HomeButtons"



export default function CreateOffice({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
    name: "",
    city:"",
    country:"",
  }});

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  
  const onSubmit = (info) => {
    dispatch(officeCreate(info))
    // navigation.navigate("Crear Equipo");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Nombre de la oficina"
            />
          )}
          name="name"
        />
        {errors.name && <Text>Campo requerido.</Text>}
        <Controller
          control={control}
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
        {errors.name && <Text>Campo requerido.</Text>}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Pais"
            />
          )}
          name="country"
        />
        {errors.country && <Text>Campo requerido.</Text>}

        <Button
          style={{ padding: 10 }}
          title="Crear Oficina"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  input: {
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: 'row'
  },
  error: {
    color: "#ff0000",
    fontSize: 9,
    marginBottom: 8,
    marginLeft: 6,
  },
});