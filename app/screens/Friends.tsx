import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import Friend from "../components/Friend";
import PFP from "../../assets/friend-pfp.png";

const DATA = [
  {
    id: "1",
    name: "Big Chungus",
    address: "Big Chungus lane",
    pfp: PFP,
  },
  {
    id: "2",
    name: "Franklin Hu",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    pfp: PFP,
  },
  {
    id: "3",
    name: "Zachary Silver",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    pfp: PFP,
  },
];

const colors = ["white", "#A5DAE2"];

const Friends = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <Friend
            name={item.name}
            address={item.address}
            pfp={item.pfp}
            color={colors[index % 2]}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
});

export default Friends;
