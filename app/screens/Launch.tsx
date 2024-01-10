import React from "react";
import { StyleSheet, View, Image } from "react-native";
import logo from "../../assets/logo-with-title.png";

import { NavigationProp, Router } from '@react-navigation/native';

interface RouterProps {
    navigation: NavigationProp<any,any>;
}

export default function Launch({ navigation }: RouterProps) {
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