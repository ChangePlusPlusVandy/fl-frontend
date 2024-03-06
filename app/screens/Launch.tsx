import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import logo from "../../assets/logo-with-title.png";
import { API_SECRET, API_URL } from "@env";
import { generateHmacSignature } from "../utils/signature";

import { NavigationProp } from "@react-navigation/native";
import useAuthStore from "../stores/auth";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export default function Launch({ navigation }: RouterProps) {
  const { user, userId, logout } = useAuthStore();
  const [userType, setUserType] = useState(undefined);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const onSuccessfulSignIn = async () => {
      try {
        const userData = await fetch(`${API_URL}user/${userId}`, {
          method: "GET",
          headers: {
            "Friends-Life-Signature": generateHmacSignature(
              JSON.stringify({ userId: userId }),
              API_SECRET
            ),
          },
        });

        const userInfo = await userData.json();

        if (!userInfo.approved) {
          Alert.alert(
            "Account not approved",
            "Your account has not been approved yet. Please contact the admin or email friendslifedev@gmail.com for more information."
          );
          await logout();
          return;
        }

        setUserType(userInfo.type);
      } catch (error) {
        console.error("Error getting user type:", error);
        // Handle error fetching user data
      }
    };

    // If user is not null, attempt to fetch user data
    if (user) {
      onSuccessfulSignIn();
    }
  }, [user, userId]); // Run this effect whenever user or userId changes

  useEffect(() => {
    if (userType !== undefined) {
      if (userType === "Staff") {
        navigation.navigate("StaffTabs");
      } else if (userType === "Family") {
        navigation.navigate("UserTabs");
      } else {
        alert("Could not verify account type successfully");
      }
    }
  }, [userType, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        alt={"launch screen logo"}
        style={{ marginLeft: 20 }}
      />
    </View>
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
