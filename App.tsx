import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./app/screens/SignIn";
import SignUp from "./app/screens/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./app/screens/Profile";
import EditProfile from "./app/screens/EditProfile";

const Stack = createNativeStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import NavBarFamily from "./app/components/NavBarFamily";
import NavBarStaff from "./app/components/NavBarStaff";

export default function App() {
  const [user, setUser] = useState("family");
  return (
    <NavigationContainer>
      {user === "family" ? <NavBarFamily /> : <NavBarStaff />}
    </NavigationContainer>
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
