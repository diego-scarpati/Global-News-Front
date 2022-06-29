import React, { useState } from 'react'
import {View, Text, Image, Button, StyleSheet, TextInput} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { sendLicenseRequest } from '../../store/license';

export default function License() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      license:"",
      startDate: "",
      endDate: "",
      attachment: "",
      observations: "",
    },
  });

  const [license1, setLicense] = useState('Unknown');
  const dispatch = useDispatch();
  
  const onSubmit = (info) => {
    console.log(info)
    /* dispatch(sendLicenseRequest({info,license})) */
  };



  return (
    <ScrollView>
      <View>
     
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
              placeholder="Fecha Inicio"
            />
          )}
          name="startDate"
        />
        {errors.startDate && <Text>This is required.</Text>}

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
              placeholder="Fecha fin"
            />
          )}
          name="endDate"
        />
        {errors.endDate && <Text>This is required.</Text>}
        <Controller
          control={control}
          
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Documento adjunto"
            />
          )}
          name="attachment"
        />
         
        <Controller
          control={control}
          
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
          
        <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
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
