import React, { Component, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  SectionList,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { teamRequestByUser, teamRequest } from "../../store/team";
import { searchAllUsers } from "../../store/user";
import HomeButton from "../HomeScreen/components/HomeButtons";

export default function TeamsHome({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const team = useSelector((state) => state.team);

  useEffect(() => {
    // dispatch(searchAllUsers());
    dispatch(teamRequestByUser());
    // dispatch(teamRequest())
  }, []);

  console.log("user", user);
  console.log("team view", team);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {team.map((data, i) => {
          return (
            <View style={styles.list} key={i}>
              <Pressable onPress={() => navigation.navigate("Equipo", data)}>
                <Text>Equipo: {data.name}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#f89d1e",
    height: 1000,
    alignItems: "center",
  },
});
