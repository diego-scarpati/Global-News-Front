import React, { useRef, useState } from "react";
// import { PickerIOS, Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendLicenseRequest } from "../../store/license";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

import {
  sendPushNotification,
  setNotificationMessage,
} from "../../utils/notifications";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Modal,
  ImageBackground,
  ActivityIndicator,
  Alert,
  ScrollView,
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
    info.type = selectedValue
    console.log("🚀 ~ file: LicenseRequest.jsx ~ line 55 ~ onSubmit ~ info", info)
    dispatch(sendLicenseRequest(info));
    sendNotification();
    navigation.navigate("Pantalla Principal");
    return (
      <View>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  };

  const sendNotification = async () => {
    const resultToken = user.expoToken;
    if (!resultToken) {
      Alert.alert("No se pudo obtener el token del usuario");
      return;
    }
    const messageNotification = setNotificationMessage(
      resultToken,
      "Nueva Licencia Solicitada",
      "Licencia",
      { data: "Licencia de Prueba" }
    );
    const response = await sendPushNotification(messageNotification);

    if (response) {
      Alert.alert("Licencia enviada");
    } else {
      Alert.alert("Ocurrio un problema enviando la Licencia");
    }
  };

  const licencias = [
    "Tipos de Novedades",
    "Licencia no justificada",
    "Licencia Vacaciones ",
    "Retiro Fuera de Horario",
    "Ingreso Fuera de Horario",
    "Llegada Tarde",
    "Ausencia con Aviso",
    "Ausencia sin Aviso",
    "Hora Extra",
    "Home Office",
    "Otros",
    "Feriados",
    "Licencia justificada",
    "Licencia por enfermedad",
    "Guardia",
    "Licencia Estudio",
    "Horas Nocturnidad",
    "Hora a Compensar",
    "Licencia sin goce de sueldos",
  ];
  const [selectedValue, setSelectedValue] = useState("Tipo de licencia");
  const [visible, setVisible] = useState(false);
  const hideMenu = (value) => {
    setSelectedValue(value);
    setVisible(false);
  };
  const showMenu = () => setVisible(true);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Menu
          visible={visible}
          anchor={<Text onPress={showMenu}>Seleccione una licencia</Text>}
          onRequestClose={hideMenu}
          style={styles.menu}
        >
          <ScrollView>
            {licencias.map((licencia) => (
              <MenuItem
                key={licencia}
                onPress={() => hideMenu(licencia)}
              >
                {licencia}
              </MenuItem>
            ))}
          </ScrollView>
        </Menu>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value, setValue } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={selectedValue}
              placeholder="Licencia"
            />
          )}
          name="type"
          defaultValue="Tipo de licencia"
        />
        {errors.type && <Text style={styles.error}>Seleccione una opción</Text>}
        <Modal
          style={{flex: 1}}
          animationType="slide"
          transparent={false}
          visible={showModalStart}
        >
          <Calendar text={"start"} />
          <Button style={{marginBottom: 200}}
            title="Cerrar"
            onPress={() => {
              setShowModalStart(!showModalStart);
            }}
          />
        </Modal>
        <HomeButton
          style={{ marginBottom: 20 }}
          text="Elegir Fecha Inicio"
          onPress={() => {
            setShowModalStart(!showModalStart);
          }}
        />
        <View style={styles.input} pointerEvents="none">
          <Text>Dia de inicio: </Text>
          <Text>{selectedDay.start}</Text>
        </View>
        {errors.startDate && <Text>Campo requerido.</Text>}
        <Modal style={{flex: 1}} animationType="slide" transparent={false} visible={showModalEnd}>
          <Calendar text={"end"} />
          <Button style={{marginBottom: 200}}
            title="Cerrar"
            onPress={() => {
              setShowModalEnd(!showModalEnd);
            }}
          />
        </Modal>
        <HomeButton
          text="Elegir Fecha Fin"
          onPress={() => {
            setShowModalEnd(!showModalEnd);
          }}
        />
        <View style={styles.input} pointerEvents="none">
          <Text>Dia de finalizacion: </Text>
          <Text>{selectedDay.end}</Text>
        </View>
        {errors.endDate && <Text>Campo requerido.</Text>}
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
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // margin: 10,
  },
  pickerContainer: {},
  menu: {
    borderColor: "black",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    maxHeight: "60%",
    overflow: "hidden"
    // padding: 10,
    // margin: 10,
    // alignItems: "center",
    // position: "absolute",
    // height: 20,
    // width: 200,
    // height: "auto",
    // width: "80%",
    // flexDirection: "row",
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: "row",
    overflow: "hidden",
  },
  error: {
    color: "#ff0000",
    fontSize: 15,
    marginBottom: 8,
    marginLeft: 6,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 700,
    height: "100%",
  },
});
