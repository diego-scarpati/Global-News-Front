import React, { Component, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  SectionList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { teamRequest } from "../../store/team";
import { searchAllUsers } from "../../store/user";

export default function Team() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const team = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(searchAllUsers());
    dispatch(teamRequest());
  }, []);

  console.log("user", user);
  console.log("team view", team);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {team.map((data, i) => {
          return (
            <View style={styles.list} key={i}>
              <Text>Equipo: {data.name}</Text>
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
