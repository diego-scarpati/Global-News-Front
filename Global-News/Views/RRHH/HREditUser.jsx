import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TextInput,
  ImageBackground,
  Pressable
} from "react-native";
import { editUser } from "../../store/hrEditUser";
import image from "../../assets/background-startScreen-02.png";
import HomeButton from "../HomeScreen/components/HomeButtons";
import useInput from "../../utils/useInput"
import { setDate } from "../../utils/getDate";

export default function HREditUser({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      nationalId: user.nationalId || "",
      birthday: user.birthday || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      countryOfResidence: user.countryOfResidence || "",
      city: user.city || "",
      address: user.address || "",
      startDate: user.startDate || "",
      employeeId: user.employeeId || "",
      workingDays: user.workingDays || "",
      shift: user.shift || "",
    },
  });
  const onSubmit = (info) => {
    info.startDate = setDate(info.startDate)
    info.birthday = setDate(info.birthday);
    dispatch(editUser({ info, id: user.id }));
    navigation.navigate("Recursos Humanos Seleccionar Usuario");
  };

  return (
    <ScrollView>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.title}>Editar datos</Text>
          <View>
            <View style={styles.editar}>
              <Text style={styles.text}>Nombre:</Text>
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
                    placeholder="Nombre"
                  />
                )}
                name="firstName"
              />
              {errors.firstName && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Apellido:</Text>
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
                    placeholder="Apellido"
                  />
                )}
                name="lastName"
              />
              {errors.lastName && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>DNI:</Text>
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
                    placeholder="DNI"
                  />
                )}
                name="nationalId"
              />
              {errors.nationalId && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Fecha de nacimiento:</Text>
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
                    placeholder="DD/MM/AAAA"
                  />
                )}
                name="birthday"
              />
              {errors.birthday && <Text>Campo Requerido.</Text>}
            </View>
           <View style={styles.editar}>
              <Text style={styles.text}>Email:</Text>
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
                    placeholder="Email"
                  />
                )}
                name="email"
              />
              {errors.email && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Telefono:</Text>
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
                    defaultValue={value}
                    placeholder="Telefono"
                  />
                )}
                name="phoneNumber"
              />
              {errors.phoneNumber && <Text>Campo Requerido.</Text>}
            </View>

            <View style={styles.editar}>
              <Text style={styles.text}>Pais:</Text>
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
                    placeholder="Pais"
                  />
                )}
                name="countryOfResidence"
              />
              {errors.countryOfResidence && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Ciudad:</Text>
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
                    placeholder="Ciudad"
                  />
                )}
                name="city"
              />
              {errors.city && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Direccion:</Text>
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
                    defaultValue={value}
                    placeholder="Direccion"
                  />
                )}
                name="address"
              />
              {errors.address && <Text>Campo Requerido.</Text>}
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Inicio Laboral:</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="DD/MM/AAAA"
                  />
                )}
                name="startDate"
              />
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Numero de legajo:</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Numero de legajo"
                  />
                )}
                name="employeeId"
              />
            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Dias Laborales:</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Dias laborales"
                  />
                )}
                name="workingDays"
              />

            </View>
            <View style={styles.editar}>
              <Text style={styles.text}>Turnos Laborales:</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Turno Laboral"
                  />
                )}
                name="shift"
              />
            </View>
          </View> 

          <HomeButton text={"Enviar"} onPress={handleSubmit(onSubmit)} />
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
  },
  title: {
    fontSize: 17,
    color: "#ffff",
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    minHeight: 700,
  },
  input: {
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 210,
    backgroundColor: "#ffff",
  },
  editar: {
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  text:{
    color: "#ffff",
    fontWeight: "bold",
  },
});
