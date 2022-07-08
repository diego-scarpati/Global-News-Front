import React, { useEffect } from "react";
import {StyleSheet,View,Text,StatusBar,SafeAreaView,SectionList,Pressable} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  teamRequestByUser,
  teamRequest,
  searchTeamById,
} from "../../store/team";
import image from "../../assets/background-startScreen-02.png";

export default function TeamsHome({ navigation }) {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);

  const onPress = (item) => {
    const request = async () => {
      const team = await dispatch(searchTeamById(item));
      navigation.navigate("Equipo", item);
    };
    request();
  };

  useEffect(() => {
    dispatch(teamRequestByUser());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.mainText}>Equipos</Text>
        <SectionList
          sections={[{ title: "Equipos", data: team }]}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Pressable onPress={() => onPress(item.id)}>
                <Text style={styles.text}>{item.name}</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#f89d1e",
    height: 1000,
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    justifyContent: "center",
    alignContent: "center",
    padding: 5,
    margin: 5,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#0073b7",
    borderWidth: 2,
    margin: 2,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
  },
  mainText: {
    fontSize: 30,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  }
});
