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

  const [showModal, setShowModal] = useState(false);

  const onSubmit = (info) => {
    console.log('INFO:' , info)
    dispatch(sendLicenseRequest(info));
    navigation.navigate("HomeScreen");
  };

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
        <Modal animationType="slide" transparent={false} visible={showModal}>
          <Calendar />
          <Button
            title="Cerrar"
            onPress={() => {
              setShowModal(!showModal);
            }}
          ></Button>
        </Modal>
        <Button
          style={{ marginBottom: 20 }}
          title="Elegir Fecha Inicio"
          onPress={() => {
            setShowModal(!showModal);
          }}
        ></Button>
         <View style = {styles.input} pointerEvents="none">
           <Text>Dia de inicio: </Text>
          <Text>{selectedDay[0]}</Text>
        </View>

        <Modal animationType="slide" transparent={false} visible={showModal}>
          <Calendar />
          <Button
            title="Cerrar"
            onPress={() => {
              setShowModal(!showModal);
            }}
          ></Button>
        </Modal>
        <Button
          title="Elegir Fecha Fin"
          onPress={() => {
            setShowModal(!showModal);
          }}
        ></Button>
        
         <View style = {styles.input} pointerEvents="none">
           <Text>Dia de finalizacion: </Text>
          <Text>{selectedDay[1]}</Text>
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

// import React, { useState } from 'react'
// import { Picker } from "@react-native-picker/picker";
// import { useForm, Controller } from "react-hook-form";
// import { useDispatch, useSelector } from 'react-redux';
// import { ScrollView } from "react-native-gesture-handler";
// import {View, Text, Button, StyleSheet, TextInput, Modal} from "react-native";

// import Calendar from "../Calendar/Calendar"
// import { sendLicenseRequest } from '../../store/license';

// export default function License({navigation}) {
  
//   const selector = useSelector((state)=>{state.calendar})
//   console.log("start",selector)

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm({
//     defaultValues: {

//       type: "",
//       startDate: "",
//       endDate: "",
//       attachment: "",
//       observations: "",
//     },
//   });

//   const dispatch = useDispatch();

//   const [showModal, setShowModal] = useState(false)

//   const onSubmit = (info) => {
//     console.log(info)
//     /* dispatch(sendLicenseRequest(info))
//       navigation.navigate('HomeScreen') */
//   };

//   return (
//     <ScrollView>
//       <View>

//       <Controller
//           control={control}
//           render={({ value }) => (
//             <View>
//               <Picker
//                 selectedValue={value}
//                 onValueChange={itemValue => setValue("type", itemValue)}
//                 style={styles.input}
//               >
//                 <Picker.Item label="Tipo de Licencia" value="Unknown" color="#aaaa"/>
//                 <Picker.Item label="Vacaciones" value="Vacaciones" />
//                 <Picker.Item label="Día de estudio" value="Día de estudio" />
//                 <Picker.Item label="Enfermedad" value="Enfermedad" />
//               </Picker>
//             </View>
//           )}
//           name="type"
//           defaultValue="Tipo de licencia"
//         />
//         {errors.type && <Text>Seleccione una opción</Text>}

    
//         <Modal
//         animationType='slide'
//         transparent = { false }
//         visible= {showModal}
//         >
//           <Calendar text={"end"}/>
//           <Button
//           title='Cerrar'
//           onPress={()=> {
//             setShowModal(!showModal)
//           }}
//           />

//         </Modal>
//         <Button
//          title="Elegir Fecha Inicio"
//          onPress={()=> {
//           setShowModal(!showModal)
//          }}
//         />

//         <Modal
//         animationType='slide'
//         transparent = { false }
//         visible= {showModal}
//         >
//           <Calendar text={["end","start"]}/>
//           <Button
//           title='Cerrar'
//           onPress={()=> {
//             setShowModal(!showModal)
//           }}
//           />

//         </Modal>
//         <Button
//          title="Elegir Fecha Fin"
//          onPress={()=> {
//           setShowModal(!showModal)
//          }}
//         />

//         <Controller
//         control={control}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             style={styles.input}
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             placeholder="Archivo adjunto"
//           />
//         )}
//         name="attachment"
//       />

//       <Controller
//         control={control}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             style={styles.input}
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             placeholder="Observaciones"
//           />
//         )}
//         name="observations"
//       />


//         <Button title="Enviar" onPress={handleSubmit(onSubmit)} />

//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     borderColor: "gray",
//     width: "80%",
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     margin: 10,
//   },
//   error: {
//     color: '#ff0000',
//     fontSize: 9,
//     marginBottom: 8,
//     marginLeft: 6,
//   },
// });
