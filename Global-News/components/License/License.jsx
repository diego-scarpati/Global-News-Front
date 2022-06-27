import React, { useState } from 'react'
import {View, Text, Button, StyleSheet, TextInput} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

export default function License() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      attachment: "",
      observations: "",
    },
  });

const [license, setLicense] = useState('Unknown');

  const onSubmit = (data) => {
    console.log(data)
    // axios
    //   .post("http://localhost:3001/xxxx/xxxx/xxxxx", data)
    //   .then((res) => res.data)
    //   navigate("/Home");
  };

  return (
    <ScrollView>
      <View>
        <Picker 
        style={styles.input}
         selectedValue={license}
         onValueChange={(value, index) => setLicense(value)}
         mode="dropdown"
       >
          <Picker.Item label="Tipo de Licencia" value="Unknown" color="#aaaa"/>
          <Picker.Item label="Vacaciones" value="Vacaciones" />
          <Picker.Item label="Día de Estudio" value="Día de Estudio" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>

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
              placeholder="Fecha inicio"
            />
          )}
          name="startDate"
        />
        {errors.startDate && <Text>Campo requerido.</Text>}
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
              placeholder="Fecha finalizacion"
            />
          )}
          name="endDate"
        />
        {errors.endDate && <Text>Campo requerido.</Text>}
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
              placeholder="Adjuntar"
            />
          )}
          name="attachment"
        />
        {/* {errors.attachment && <Text>This is required.</Text>} */}
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
              placeholder="Observaciones"
            />
          )}
          name="observations"
        />
        {/* {errors.observations && <Text>This is required.</Text>} */}
        <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
