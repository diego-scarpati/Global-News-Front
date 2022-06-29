import React, { useState } from 'react'
import {View, Text, Image, Button, StyleSheet, TextInput, Modal} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import Calendar from '../Calendar/Calendar';

export default function License() {
  const [showModal, setShowModal] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      attachment: " ",
      observations: " ",
    },
  });
const dispatch = useDispatch();
  
  const onSubmit = (info) => {
    console.log("informacion",info)
    //dispatch(sendLicenseRequest(info,license))
    // axios
    //   .post("http://localhost:3001/xxxx/xxxx/xxxxx", data)
    //   .then((res) => res.data)
    //   navigate("/Home");
  };
  const [license, setLicense] = useState('Unknown');
  // console.log("aa",license)
  // const handleVisibility = () => {
  //   const view = true
  // }
    

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
        <Modal
        animationType='slide'
        transparent = { false }
        visible= {showModal}
        >
          <Calendar/>
          <Button
          title='Cerrar'
          onPress={()=> {
            setShowModal(!showModal)
          }}
          ></Button>

        </Modal>
        <Button
         title="Elegir Fecha Fin"
         onPress={()=> {
          setShowModal(!showModal)
         }}
        >
        </Button>
        <Modal
        animationType='slide'
        transparent = { false }
        visible= {showModal}
        >
          <Calendar/>
          <Button
          title='Cerrar'
          onPress={()=> {
            setShowModal(!showModal)
          }}
          ></Button>

        </Modal>
        <Button
         title="Elegir Fecha Inicio"
         onPress={()=> {
          setShowModal(!showModal)
         }}
        >
        </Button>

        {/* <Modal> */}
        {/* <Controller
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
        {errors.startDate && <Text>This is required.</Text>} */}
       
        {/* <Controller
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
        {errors.endDate && <Text>This is required.</Text>} */}
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
              placeholder="Documento adjunto"
            />
          )}
          name="attachment"
        />
         {errors.attachment && <Text>This is required.</Text>}
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
         {errors.observations && <Text>This is required.</Text>} 
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
