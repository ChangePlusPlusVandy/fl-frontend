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

const Stack = createNativeStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import NavBarFamily from "./app/components/NavBarFamily";
import NavBarStaff from "./app/components/NavBarStaff";

export default function App() {
  const [user, setUser] = useState("family");
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserTabs">
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
      </Stack.Navigator>
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
