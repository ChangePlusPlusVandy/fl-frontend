import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import NavBarFamily from "./app/components/NavBarFamily";
import NavBarStaff from "./app/components/NavBarStaff";

export default function App() {
  const [user, setUser] = useState("staff");
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
