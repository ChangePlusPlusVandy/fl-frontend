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

const Conversations = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [chats, setChats] = useState([
    {
      id: "1",
      name: "John Doe",
      profileImage: require("../../assets/friends-life-logo.png"), // Replace with actual image path
      lastMessage: "Hello, how are you?",
      lastMessageTime: moment().subtract(30, "minutes"), // Example: 30 minutes ago
    },
    {
      id: "2",
      name: "Alice Smith",
      profileImage: require("../../assets/friends-life-logo.png"), // Replace with actual image path
      lastMessage: "Good morning!",
      lastMessageTime: moment().subtract(1, "hour"), // Example: 1 hour ago
    },
    // Add more chat objects as needed
  ]);
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Messages</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <View style={styles.plusButton}>
            <FontAwesome name="plus" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
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
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem}>
            <Image source={item.profileImage} style={styles.profileImage} />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.lastMessage}>
                {item.lastMessage} · {item.lastMessageTime.fromNow()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50, // Increased margin from the top
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1, // Allow title to expand
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#f89b40",
    borderRadius: 25,
    padding: 10,
  },
  plusButton: {
    backgroundColor: "#f89b40",
    borderRadius: 25, // Set the borderRadius to half of the button size
    width: 25, // Set the width and height to create a circle
    height: 25,
    alignItems: "center", // Center the plus icon horizontally
    justifyContent: "center", // Center the plus icon vertically
  },
  divider: {
    height: 2, // Increased thickness
    backgroundColor: "#000", // Color set to black
    width: "100%", // Cover the whole width,
    marginTop: 15,
    marginBottom: 15,
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
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatInfo: {
    marginLeft: 15,
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 16,
    color: "#818181",
  },
});

export default Conversations;
