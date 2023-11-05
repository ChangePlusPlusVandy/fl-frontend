import React from "react";
import { StyleSheet, View, Image } from "react-native";
import logo from "../../assets/logo-with-title.png";

export default function Launch() {
    return (
        <View style={styles.container}>
            <Image source={logo} alt={"launch screen logo"}style={{ marginLeft: 20 }}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });