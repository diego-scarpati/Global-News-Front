import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {View,Text,Button,StyleSheet,TextInput,ScrollView} from "react-native";
import { teamCreate } from "../../store/team"
import HomeButton from "../../Views/HomeScreen/components/HomeButtons";


export default function CreateTeam({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
    name: "",
  }});

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  
  const onSubmit = (info) => {
    dispatch(teamCreate(info));
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
              placeholder="Nombre del Equipo"
            />
          )}
          name="name"
        />
        {errors.name && <Text>Campo requerido.</Text>}
        <HomeButton
            text="Crear Equipo"
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