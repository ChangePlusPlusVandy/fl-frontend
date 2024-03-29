import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/StaffHome";
import Conversations from "../screens/Conversations";
import Friends from "../screens/Friends";
import Attendance from "../screens/Attendance";
import HomeIcon from "../../assets/tabhome.png";
import MessagesIcon from "../../assets/tabmessages.png";
import FriendsIcon from "../../assets/tabfriends.png";
import AttendanceIcon from "../../assets/tabattendance.png";

import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AttendanceHistory from "../screens/AttendanceHistory";
import BackButton from "./BackButton";
import { Header } from "react-native/Libraries/NewAppScreen";
import DayAttendance from "../screens/DayAttendance";
import DayAttendanceUser from "../screens/DayAttendanceUser";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const NavBarStaff = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarStyle: { height: 90 }, headerShown: false }}>
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
                }}>
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
                }}></Image>
            );
          },
          tabBarActiveTintColor: "#F89B40",
          tabBarInactiveTintColor: "#D9D9D9",
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={AttendanceNavigator}
        options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text
                style={{
                  fontSize: 14,
                  marginTop: -10,
                  color: focused ? "black" : "#D9D9D9",
                }}>
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
                }}></Image>
            );
          },
          headerShown: false,
          tabBarActiveTintColor: "#F89B40",
          tabBarInactiveTintColor: "#D9D9D9",
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={Conversations}
        options={{
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text
                style={{
                  fontSize: 15,
                  marginTop: -10,
                  color: focused ? "black" : "#D9D9D9",
                }}>
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
                }}></Image>
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
                }}>
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
                }}></Image>
            );
          },
          tabBarActiveTintColor: "#F89B40",
          tabBarInactiveTintColor: "#D9D9D9",
        }}
      />
    </Tab.Navigator>
  );
};

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const AttendanceNavigator = ({ navigation }: RouterProps) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="AttendanceToday">
        <Stack.Screen
          name="Today's Attendance"
          component={Attendance}
          options={{}}
        />
        <Stack.Screen
          name="AttendanceHistory"
          component={AttendanceHistory}
          options={{
            headerTitle: "Attendance Record",
            headerBackTitle: "Back",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="DayAttendance"
          component={DayAttendance}
          options={{
            headerTitle: "Attendance - Date",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="DayAttendanceUser"
          component={DayAttendanceUser}
          options={{
            headerTitle: "Attendance - Date",
            headerBackTitle: "Back",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavBarStaff;
