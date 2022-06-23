import React from "react";
import { View, Text, Image, Button, Alert, StyleSheet} from "react-native";
import { Link, Redirect, Route, Switch } from 'react-router-native'
import logo from "../assets/gnlogogrande-01.png";

export default function Login() {
  return (
    <View style={styles.container}>
        <View>
          <Image
            source={logo}
            style= {{
              height: 100,
              width: 200,
            }}
          />
        </View>
        <View>
          <Text>Login</Text>
        </View>
        <View>
          {/* <Link to="/login"> */}
            <Button
              title="Login"
              onPress={() => console.log("Simple Button pressed")}
            />
          {/* </Link> */}
        </View>
        <View>
          <Button
            title="Register"
            onPress={() => Alert.alert("Simple Button pressed")}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });