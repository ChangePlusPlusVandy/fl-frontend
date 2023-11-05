import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Messages from "../screens/Messages";
import Friends from "../screens/Friends";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Friends" component={Friends} />
    </Tab.Navigator>
  );
};

export default NavBar;
