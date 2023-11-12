import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Menu from "../../assets/menu-vertical.png";

const Friend = ({ name, address, pfp, color }) => {
  return (
    <View
      style={
        (styles.container,
        {
          backgroundColor: color,
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          padding: 7,
          marginVertical: 5,
          marginHorizontal: 10,
          borderRadius: 20,
          justifyContent: "space-between",
          gap: 10,
        })
      }
    >
      <View>
        <Image source={pfp} style={styles.image}></Image>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
      <TouchableOpacity>
        <Image source={Menu} style={styles.menu}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 7,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: "space-between",
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: "#E1E9F1",
    borderWidth: 2,
    backgroundColor: "white",
  },
  menu: {
    width: 20,
    height: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    textAlignVertical: "top",
  },
  address: {
    fontWeight: "300",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
});

export default Friend;
