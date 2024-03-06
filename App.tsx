import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./app/screens/SignIn";
import SignUp from "./app/screens/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./app/screens/Profile";
import EditProfile from "./app/screens/EditProfile";
import NewPost from "./app/screens/NewPost";
import Launch from "./app/screens/Launch";
import Report from "./app/screens/Report";
import Messages from "./app/screens/Messages";
import NewFriendReport from "./app/screens/NewFriendReport";
import ForgotPassword from "./app/screens/ForgotPassword";

const Stack = createNativeStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import NavBarFamily from "./app/components/NavBarFamily";
import NavBarStaff from "./app/components/NavBarStaff";
import AttendanceHistory from "./app/screens/AttendanceHistory";
import { StatusBar } from "react-native";
import useAuthStore from "./app/stores/auth";

export default function App() {
  const { userId } = useAuthStore();

  const [user, setUser] = useState("family");
  console.log(userId);
  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={userId ? "Launch" : "SignIn"}
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            gestureDirection: "horizontal",
          }}>
          {userId === null ? (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          ) : (
            <>
              <Stack.Screen name="Launch" component={Launch} />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                }}
              />
              <Stack.Screen
                name="NewPost"
                component={NewPost}
                options={{
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                }}
              />
              <Stack.Screen name="UserTabs" component={NavBarFamily} />
              <Stack.Screen name="StaffTabs" component={NavBarStaff} />
              <Stack.Screen
                name="Report"
                component={Report}
                options={{
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                }}
              />
              <Stack.Screen
                name="AttendanceHistory"
                component={AttendanceHistory}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Messages"
                component={Messages}
                options={{
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                }}
              />
              <Stack.Screen
                name="NewFriendReport"
                component={NewFriendReport}
                options={{
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                }}
              />
            </>
          )}
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
