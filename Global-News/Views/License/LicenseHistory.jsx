import React,{ useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar} from "react-native";
import { sendHistoyLicensesRequest } from "../../store/license"



export default function RrHh() {
  const dispatch = useDispatch();
  const licencias = useSelector((state) => state.license);
  useEffect(() => {dispatch(sendHistoyLicensesRequest())},[])


  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={[{ title: "Historial licencias", data: licencias }]}
        renderItem={({ item }) => (
          <View style={styles.row}>
          
            {/* <Text>Solicitante: {item.user?.firstName} {item.user?.lastName}</Text> */}
            <Text>Tipo de licencia: {item.type}</Text>
            <Text>Inicio: {item.startDate}</Text>
            <Text>Fin: {item.endDate}</Text>
            <Text>Observaciones:{item.observations}</Text>
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
  },
  sectionHeader: {
    backgroundColor: "#efefef",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
