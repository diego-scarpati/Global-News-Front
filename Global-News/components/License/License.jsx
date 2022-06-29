import React, { useState } from 'react'
import {View, Text, Image, Button, StyleSheet, TextInput, Modal} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import Calendar from "../Calendar/Calendar"
import { useDispatch } from 'react-redux';
import { sendLicenseRequest } from '../../store/license';

export default function License({navigation}) {

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {

      type: "",
      startDate: "",
      endDate: "",
      attachment: "",
      observations: "",
    },
  });

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false)

  const onSubmit = (info) => {
    dispatch(sendLicenseRequest(info))
      navigation.navigate('HomeScreen')
  };

  return (
    <ScrollView>
      <View>

      <Controller
          control={control}
          render={({ value }) => (
            <View>
              <Picker
                selectedValue={value}
                onValueChange={itemValue => setValue("type", itemValue)}
                style={styles.input}
              >
                <Picker.Item label="Tipo de Licencia" value="Unknown" color="#aaaa"/>
                <Picker.Item label="Vacaciones" value="Vacaciones" />
                <Picker.Item label="Día de estudio" value="Día de estudio" />
                <Picker.Item label="Enfermedad" value="Enfermedad" />
              </Picker>
            </View>
          )}
          name="type"
          defaultValue="Tipo de licencia"
        />
        {errors.type && <Text>Seleccione una opción</Text>}

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

        <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Archivo adjunto"
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
  error: {
    color: '#ff0000',
    fontSize: 9,
    marginBottom: 8,
    marginLeft: 6,
  },
});
