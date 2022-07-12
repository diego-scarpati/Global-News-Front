import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendLicenseRequest } from "../../store/license";
import { ScrollView } from "react-native-gesture-handler";
import { sendPushNotification, setNotificationMessage } from "../../utils/notifications";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Modal,
  ImageBackground,
  ActivityIndicator,
  Alert
} from "react-native";
import Calendar from "../Calendar/Calendar";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "../HomeScreen/components/HomeButtons";


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
  const user = useSelector((state) => state.user);

  const [showModalStart, setShowModalStart] = useState(false);
  const [showModalEnd, setShowModalEnd] = useState(false);

  const onSubmit = (info) => { 
    info.startDate = selectedDay.start;
    info.endDate = selectedDay.end;
    dispatch(sendLicenseRequest(info));
    sendNotification()
    navigation.navigate("Pantalla Principal");
    return (
      <View>
        <ActivityIndicator size="large" color="blue" />
      </View>
    ); 
  };

const sendNotification = async () => {
  const resultToken = user.expoToken
  if(!resultToken){
    Alert.alert('No se pudo obtener el token del usuario')
    return
  }
  const messageNotification = setNotificationMessage(
    resultToken,
    'Nueva Licencia Solicitada',
    'Licencia',
    {data: 'Licencia de Prueba'}
  )
    const response = await sendPushNotification(messageNotification)

    if (response) { 
      Alert.alert('Licencia enviada')
    } else {
      Alert.alert('Ocurrio un problema enviando la Licencia')
    }
}

  return (
    <ScrollView>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
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
                />
                <Picker.Item
                  label="Ausencia con aviso"
                  value="Ausencia con aviso"
                />
                <Picker.Item
                  label="Ingreso fuera de horario"
                  value="Ingreso fuera de horario"
                />
                <Picker.Item
                  label="Retiro fuera de horario"
                  value="Retiro Fuera de horario"
                />
                <Picker.Item
                  label="Licencia estudio"
                  value="Licencia estudio"
                />
                <Picker.Item
                  label="Licencia justificada"
                  value="Licencia justificada"
                />
                <Picker.Item
                  label="Licencia no justificada"
                  value="Licencia no justificada"
                />
                <Picker.Item
                  label="Licencia por enfermedad"
                  value="Licencia por enfermedad"
                />
                <Picker.Item
                  label="Licencia sin goce de sueldos"
                  value="Licencia sin goce de sueldos"
                />
                <Picker.Item
                  label="Licencia vacaciones"
                  value="Licencia vacaciones"
                />
                <Picker.Item label="Otros" value="Otros" />
              </Picker>
            )}
            name="type"
            defaultValue="Tipo de licencia"
          />
          {errors.type && <Text style={styles.error}>Seleccione una opción</Text>}

          <Modal
            animationType="slide"
            transparent={false}
            visible={showModalStart}
          >
            <Calendar text={"start"} />
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

          <View style={styles.input} pointerEvents="none">
            <Text>Dia de inicio: </Text>
            <Text>{selectedDay.start}</Text>
          </View>
          {errors.startDate && <Text>Campo requerido.</Text>}

          <Modal
            animationType="slide"
            transparent={false}
            visible={showModalEnd}
          >
            <Calendar text={"end"} />
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
          <View style={styles.input} pointerEvents="none">
            <Text>Dia de finalizacion: </Text>
            <Text>{selectedDay.end}</Text>
          </View>
          {errors.endDate && <Text>Campo requerido.</Text>}

          {/* <Controller
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
          /> */}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                multiline
                numberOfLines={3}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Observaciones"
              />
            )}
            name="observations"
          />
          <HomeButton text="Enviar" onPress={handleSubmit(onSubmit)} />
        </View>
      </ImageBackground>
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
    backgroundColor: "#ffff",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: "row",
  },
  error: {
    color: "#ff0000",
    fontSize: 15,
    marginBottom: 8,
    marginLeft: 6,
    fontWeight: "bold"
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    minHeight: 700,
  },

});
