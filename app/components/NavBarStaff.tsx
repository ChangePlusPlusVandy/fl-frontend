import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Messages from "../screens/Messages";
import Friends from "../screens/Friends";
import Attendance from "../screens/Attendance";
import HomeIcon from "../../assets/tabhome.png";
import MessagesIcon from "../../assets/tabmessages.png";
import FriendsIcon from "../../assets/tabfriends.png";
import AttendanceIcon from "../../assets/tabattendance.png";

const Tab = createBottomTabNavigator();

const NavBarStaff = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: { height: 90 } }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text
                style={{
                  fontSize: 15,
                  marginTop: -10,
                  color: focused ? "black" : "#D9D9D9",
                }}
              >
                Home
              </Text>
            );
          },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                source={HomeIcon}
                style={{
                  width: 28,
                  height: 30,
                  tintColor: color,
                }}
              ></Image>
            );
          },
          tabBarActiveTintColor: "#F89B40",
          tabBarInactiveTintColor: "#D9D9D9",
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text
                style={{
                  fontSize: 15,
                  marginTop: -10,
                  color: focused ? "black" : "#D9D9D9",
                }}
              >
                Attendance
              </Text>
            );
          },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                source={AttendanceIcon}
                style={{
                  width: 35,
                  height: 35,
                  tintColor: color,
                }}
              ></Image>
            );
          },
          tabBarActiveTintColor: "#F89B40",
          tabBarInactiveTintColor: "#D9D9D9",
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text
                style={{
                  fontSize: 15,
                  marginTop: -10,
                  color: focused ? "black" : "#D9D9D9",
                }}
              >
                Messages
              </Text>
            );
          },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                source={MessagesIcon}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: color,
                }}
              ></Image>
            );
          },
          tabBarActiveTintColor: "#F89B40",
          tabBarInactiveTintColor: "#D9D9D9",
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text
                style={{
                  fontSize: 15,
                  marginTop: -10,
                  color: focused ? "black" : "#D9D9D9",
                }}
              >
                Friends
              </Text>
            );
          },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                source={FriendsIcon}
                style={{
                  width: 45,
                  height: 45,
                  tintColor: color,
                }}
              ></Image>
            );
          },
          tabBarActiveTintColor: "#F89B40",
          tabBarInactiveTintColor: "#D9D9D9",
        }}
      />
    </Tab.Navigator>
  );
};

export default NavBarStaff;
