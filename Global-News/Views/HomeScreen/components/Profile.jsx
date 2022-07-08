import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "../../../styles/HomeScreen/profile";


export default function Profile() {

const user = useSelector((state) => state.user)

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://img.icons8.com/ios/344/user-male-circle.png",
          }}
        />
        <Text style={styles.name}>{user.firstName}</Text>
        <Text style={styles.userInfo}>{user.email}</Text>
        <Text style={styles.userInfo}>{`${user.city}, ${user.countryOfResidence}`}</Text>
      </View>
    </View>
  );
}


