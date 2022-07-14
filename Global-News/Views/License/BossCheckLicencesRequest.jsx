import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Button,
  Pressable
} from "react-native";
import { hrLicenseBySearch } from "../../store/hr";
import SearchInput from "../Search/SearchInput";
import { searchTeamById } from "../../store/team"
import { hrLicensesReviewLicense } from "../../store/hrLicenses";

export default function BossCheckLicencesRequest({navigation}) {
  const dispatch = useDispatch();
  const licencias = useSelector((state) => state.hrLicenses);
  //const user = useSelector((state) => state.license);
  const user = useSelector((state) => state.user)


  const onPress = (name,id) => {
    const request = async () => {
      const license = await dispatch(hrLicensesReviewLicense({name:name,id}));
      navigation.navigate("Control Solicitud de Licencias");
    };
    request();
  };

  return (
      <SafeAreaView style={styles.container}>
      
        <Text style={styles.mainText}>Equipos</Text>
        {(user.teams.length == 0) && <Text>No estas en ningun equipo</Text>}
        <SectionList
          sections={[{ title: "Equipos", data: user.teams }]}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Pressable onPress={() => onPress(item.name,item.id)}>
                <Text style={styles.text}>{item.name}</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    justifyContent: "center",
    alignContent: "center",
    padding: 5,
    margin: 5,
   
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#0073b7",
    borderWidth: 2,
    margin: 2,
    borderRadius: 5,
  },
  sectionHeader: {
    backgroundColor: "#efefef",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10
  },
  buttomView: {
    margin: 10
  },
  text:{
    fontSize: 20
  }
});