import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import BackButtonIcon from "../../assets/back.png";

const BackButton = () => {
  return <Image source={BackButtonIcon} style={styles.backButton}></Image>;
};

const styles = StyleSheet.create({
  backButton: {
    width: undefined,
    height: 30,
    aspectRatio: 1,
    resizeMode: "contain",
  },
});

export default BackButton;
