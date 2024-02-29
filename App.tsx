import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./app/screens/SignIn";
import SignUp from "./app/screens/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./app/screens/Profile";
import EditProfile from "./app/screens/EditProfile";
import NewPost from "./app/screens/NewPost";
import Launch from "./app/screens/Launch";
import UserHome from "./app/screens/UserHome";
import Report from "./app/screens/Report";
import Messages from "./app/screens/Messages";
import NewFriendReport from "./app/screens/NewFriendReport";

const Stack = createNativeStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import NavBarFamily from "./app/components/NavBarFamily";
import NavBarStaff from "./app/components/NavBarStaff";
import { API_SECRET } from "@env";
import AttendanceHistory from "./app/screens/AttendanceHistory";
import { StatusBar } from "react-native";

export default function App() {
  const [user, setUser] = useState("family");
  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="Launch"
            component={Launch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewPost"
            component={NewPost}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserTabs"
            component={NavBarFamily}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StaffTabs"
            component={NavBarStaff}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Report"
            component={Report}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AttendanceHistory"
            component={AttendanceHistory}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Messages"
            component={Messages}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewFriendReport"
            component={NewFriendReport}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
