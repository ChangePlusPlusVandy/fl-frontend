import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import the FontAwesome icons
import { NavigationProp } from "@react-navigation/native";
import Friend from "../components/Friend";
import { API_URL, API_SECRET } from "@env";
import { generateHmacSignature } from "../utils/signature";
import { useFocusEffect } from "@react-navigation/native";
import useAuthStore from "../stores/auth";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface Friend {
  _id: string;
  friendName: string;
  profilePicture: string;
  reports: string[];
  attendance: string[];
  schedule: number[];
  createdAt: string;
  updatedAt: string;
}

const Friends = ({ navigation }: RouterProps) => {
  const { userId } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [friendsData, setFriendsData] = useState<Friend[]>([]);

  const filteredFriends = friendsData.filter((friend: any) => {
    return friend.friendName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getFriends = async () => {
    try {
      const userRes = await fetch(`${API_URL}user/${userId}`, {
        method: "GET",
        headers: {
          "Friends-Life-Signature": generateHmacSignature(
            JSON.stringify({ userId }),
            API_SECRET
          ),
        },
      });
      const userData = await userRes.json();

      if (userData.type === "Staff" || userData.type === "admin") {
        const friendRes = await fetch(`${API_URL}friend`, {
          method: "GET",
          headers: {
            "Friends-Life-Signature": generateHmacSignature("GET", API_SECRET),
          },
        });
        const friendData: Friend[] = await friendRes.json();
        setFriendsData(friendData);
      } else {
        const friendIds: string[] = userData.friends;
        friendIds?.forEach(async (friendId: string) => {
          const response = await fetch(`${API_URL}friend/${friendId}`, {
            method: "GET",
            headers: {
              "Friends-Life-Signature": generateHmacSignature(
                JSON.stringify({ friendId }),
                API_SECRET
              ),
            },
          });
          const friend: Friend = await response.json();
          setFriendsData((prevState: Friend[]) => [...prevState, friend]);
        });
      }
    } catch (error) {
      console.error("Error fetching friend data: ", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setFriendsData([]);
      getFriends();
    }, [])
  );

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Friends</Text>
      <View style={styles.divider} />
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={24} color="#818181" />
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
      </View>
      <FlatList
        data={filteredFriends}
        keyExtractor={(item: any) => item._id.toString()}
        renderItem={({ item }) => (
          <Friend friend={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50, // Match the increased margin from the top
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  divider: {
    height: 2, // Match the increased thickness
    backgroundColor: "#000", // Match the color set to black
    width: "100%", // Cover the whole width
    marginTop: 15,
    marginBottom: 15,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    padding: 16, // Added padding to match the style
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 25,
    height: 40,
    paddingHorizontal: 10,
    flex: 1,
  },
  searchText: {
    fontSize: 16,
    color: "#818181",
    marginLeft: 10,
    flex: 1, // Allow the text input to expand to fill available width
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendDetails: {
    marginLeft: 15,
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  friendAddress: {
    fontSize: 16,
    color: "#818181",
  },
});

export default Friends;
