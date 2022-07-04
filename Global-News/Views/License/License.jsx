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
    navigation.navigate("Pantalla Principal");
  };

  const onSend = () =>{
    navigation.navigate("Historial Licencias")
  }

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
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
                enabled={false}
              />
              <Picker.Item label="Ausencia con aviso" value="Ausencia con aviso" />
              <Picker.Item label="Ausencia sin aviso" value="Ausencia sin aviso" />
              <Picker.Item label="Feriados" value="Feriados" />
              <Picker.Item label="Guardia" value="Guardia" />
              <Picker.Item label="Hora a compensar" value="Hora a compensar" />
              <Picker.Item label="Hora extra" value="Hora extra" />
              <Picker.Item label="Horas nocturnidad" value="Horas nocturnidad" />
              <Picker.Item label="Ingreso fuera de horario" value="Ingreso fuera de horario" />
              <Picker.Item label="Licencia estudio" value="Licencia estudio" />
              <Picker.Item label="Licencia justificada" value="Licencia justificada" />
              <Picker.Item label="Licencia no justificada" value="Licencia no justificada" />
              <Picker.Item label="Licencia por enfermedad" value="Licencia por enfermedad" />
              <Picker.Item label="Licencia sin goce de sueldos" value="Licencia sin goce de sueldos" />
              <Picker.Item label="Llegada tarde" value="Llegada Tarde" />
              <Picker.Item label="Licencia vacaciones" value="Licencia vacaciones" />
              <Picker.Item label="Otros" value="Otros" />
              <Picker.Item label="Retiro fuera de horario" value="Retiro Fuera de horario" />
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
          />
        </Modal>
        <Button
          style={{ marginBottom: 20 }}
          title="Elegir Fecha Inicio"
          onPress={() => {
            setShowModalStart(!showModalStart);
          }}
        />
        
         <View style = {styles.input} pointerEvents="none">
           <Text>Dia de inicio: </Text>
          <Text>{selectedDay.start}</Text>
        </View>
        {errors.startDate && <Text>Campo requerido.</Text>}

        <Modal animationType="slide" transparent={false} visible={showModalEnd}>
          <Calendar text={"end"}/>
          <Button
            title="Cerrar"
            onPress={() => {
              setShowModalEnd(!showModalEnd);
            }}
          />
        </Modal>
        <Button
          title="Elegir Fecha Fin"
          onPress={() => {
            setShowModalEnd(!showModalEnd);
          }}
        />
         <View style = {styles.input} pointerEvents="none">
           <Text>Dia de finalizacion: </Text>
          <Text>{selectedDay.end}</Text>
          </View>
          {errors.endDate && <Text>Campo requerido.</Text>}

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