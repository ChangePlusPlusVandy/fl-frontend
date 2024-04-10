import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { NavigationProp } from "@react-navigation/native";
import useAuthStore from "../stores/auth";
import { API_SECRET, API_URL } from "@env";
import { generateHmacSignature } from "../utils/signature";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const BlockedUsers = ({ navigation }: RouterProps) => {
  const [blockedUsers, setBlockedUsers] = useState<any[]>([]);
  const { userId } = useAuthStore();

  const getBlockedUsers = async () => {
    const user = await fetch(`${API_URL}user/${userId}`, {
      method: "GET",
      headers: {
        "Friends-Life-Signature": generateHmacSignature(
          JSON.stringify({ userId }),
          API_SECRET
        ),
      },
    });
    const userData = await user.json();
    const blockedUserIds = userData.blockedUsers;

    blockedUserIds.forEach(async (blockedUserId: string) => {
      const blockedUser = await fetch(`${API_URL}user/${blockedUserId}`, {
        method: "GET",
        headers: {
          "Friends-Life-Signature": generateHmacSignature(
            JSON.stringify({ userId: blockedUserId }),
            API_SECRET
          ),
        },
      });
      const blockedUserData = await blockedUser.json();
      setBlockedUsers((prev: any[]) => [...prev, blockedUserData]);
    });
  };

  const unblock = async (user: any) => {
    Alert.alert(
      "Unblock User",
      "Are you sure you want to unblock this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await fetch(`${API_URL}user/blockUser`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Friends-Life-Signature": generateHmacSignature(
                  JSON.stringify({ userId, blockId: user._id }),
                  API_SECRET
                ),
              },
              body: JSON.stringify({ userId, blockId: user._id }),
            });

            navigation.navigate("Profile");
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    setBlockedUsers([]);
    getBlockedUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <BackButton />
        </TouchableOpacity>
        <Text style={styles.nameText}>Unblock Users</Text>
      </View>
      <View style={styles.container2}>
        {blockedUsers.map((user: any) => (
          <TouchableOpacity
            key={user._id}
            style={styles.chatItem}
            onPress={() => {
              unblock(user);
            }}>
            <Image
              source={{ uri: user.profilePicture }}
              style={styles.profileImage}
            />
            <Text style={styles.chatName}>{user.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container2: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  nameText: {
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative", // Add this line
    borderRadius: 10,
    borderWidth: 1,
    width: "80%",
    padding: 20,
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BlockedUsers;
