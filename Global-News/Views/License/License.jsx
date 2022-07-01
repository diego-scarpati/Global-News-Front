import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendLicenseRequest } from "../../store/license";
import { ScrollView } from "react-native-gesture-handler";
import {View,Text,Button,StyleSheet,TextInput,Modal,} from "react-native";
import Calendar from "../Calendar/Calendar";


export default function License({ navigation }) {
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

  const selectedDay = useSelector((state) => state.calendar);
  const user = useSelector((state) => state.user)

  const [showModalStart, setShowModalStart] = useState(false);
  const [showModalEnd, setShowModalEnd] = useState(false);

  const onSubmit = (info) => {
    info.startDate = selectedDay.start
    info.endDate = selectedDay.end
    dispatch(sendLicenseRequest(info));
    navigation.navigate("HomeScreen");
  };

  const onSend = () =>{
    navigation.navigate("Historial Licencias")
  }

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <Controller
          control={control}
          render={({ value }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => setValue("type", itemValue)}
              style={styles.input}
            >
              <Picker.Item
                label="Tipo de Licencia"
                value="Unknown"
                color="#aaaa"
              />
              <Picker.Item label="Vacaciones" value="Vacaciones" />
              <Picker.Item label="Día de estudio" value="Día de estudio" />
              <Picker.Item label="Enfermedad" value="Enfermedad" />
            </Picker>
          )}
          name="type"
          defaultValue="Tipo de licencia"
        />
        {errors.type && <Text>Seleccione una opción</Text>}
      </View>

      <View style={styles.container}>
        <Modal animationType="slide" transparent={false} visible={showModalStart}>
          <Calendar text={"start"}/>
          <Button
            title="Cerrar"
            onPress={() => {
              setShowModalStart(!showModalStart);
            }}
          ></Button>
        </Modal>
        <Button
          style={{ marginBottom: 20 }}
          title="Elegir Fecha Inicio"
          onPress={() => {
            setShowModalStart(!showModalStart);
          }}
        ></Button>
         <View style = {styles.input} pointerEvents="none">
           <Text>Dia de inicio: </Text>
          <Text>{selectedDay.start}</Text>
        </View>

        <Modal animationType="slide" transparent={false} visible={showModalEnd}>
          <Calendar text={"end"}/>
          <Button
            title="Cerrar"
            onPress={() => {
              setShowModalEnd(!showModalEnd);
            }}
          ></Button>
        </Modal>
        <Button
          title="Elegir Fecha Fin"
          onPress={() => {
            setShowModalEnd(!showModalEnd);
          }}
        ></Button>
        
         <View style = {styles.input} pointerEvents="none">
           <Text>Dia de finalizacion: </Text>
          <Text>{selectedDay.end}</Text>
          </View>
       

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

        <Button
          style={{ padding: 10 }}
          title="Enviar"
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          style={{ padding: 10 }}
          title="Historial Licencias"
          onPress={handleSubmit(onSend)}
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