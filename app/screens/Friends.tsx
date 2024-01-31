import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import the FontAwesome icons
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons for the search bar icon
import moment from "moment";

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Sample data for friends
  const friendsData = [
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St, City",
      profileImage: require("../../assets/friends-life-logo.png"), // Replace with actual image source
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Elm St, Town",
      profileImage: require("../../assets/friends-life-logo.png"), // Replace with actual image source
    },
    // Add more friend data as needed
  ];
  const filteredFriends = friendsData.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.root}>
      <Text style={styles.title}>My Friends</Text>
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.friendItem,
              { backgroundColor: index % 2 === 0 ? "#d4d4d4" : "#f89b40" }, // Alternating colors
            ]}>
            <Image source={item.profileImage} style={styles.profileImage} />
            <View style={styles.friendDetails}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendAddress}>{item.address}</Text>
            </View>
          </View>
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
