import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import the FontAwesome icons
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { API_SECRET } from "@env";
import useAuthStore from "../stores/auth";
import { generateHmacSignature } from "../utils/signature";
import NewMessagePopup from "../components/NewMessagePopup"; // Assuming the file is in the same directory

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
interface Chat {
  id: string;
  name: string;
  profileImage: any;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageTimestamp?: string;
}

const Conversations = ({ navigation }: RouterProps) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const openPopup = () => {
    setPopupVisible(true);
  };

  const { userId, checkApproved } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  const [chats, setChats] = useState<Chat[]>([]);
  const [refreshing, setRefreshing] = useState(false);


  const filteredChats = chats?.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getChats = async () => {
    try {
      setChats([]); // Clear chats before fetching new ones
      const tempChats = [];
      const userResponse = await fetch(
        `https://fl-backend.vercel.app/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Friends-Life-Signature": generateHmacSignature(
              JSON.stringify({ userId: userId }),
              API_SECRET
            ),
          },
        }
      );
      const userJSON = await userResponse.json();

      for (const chatID of userJSON.chats) {
        const chatResponse = await fetch(
          `https://fl-backend.vercel.app/chat/${chatID}`,
          {
            method: "GET",
            headers: {
              "Friends-Life-Signature": generateHmacSignature(
                JSON.stringify({ chatId: chatID }),
                API_SECRET
              ),
            },
          }
        );
        const chat = await chatResponse.json();

        if (chat.messages?.length > 0) {
          const messagesResponse = await fetch(
            `https://fl-backend.vercel.app/message/${
              chat.messages[chat.messages.length - 1]
            }`,
            {
              method: "GET",
              headers: {
                "Friends-Life-Signature": generateHmacSignature(
                  JSON.stringify({
                    messageId: chat.messages[chat.messages.length - 1],
                  }),
                  API_SECRET
                ),
              },
            }
          );
          const messageJSON = await messagesResponse.json();

          const otherUser = chat.user1 == userId ? chat.user2 : chat.user1;
          const userResponse = await fetch(
            `https://fl-backend.vercel.app/user/${otherUser}`,
            {
              method: "GET",
              headers: {
                "Friends-Life-Signature": generateHmacSignature(
                  JSON.stringify({ userId: otherUser }),
                  API_SECRET
                ),
              },
            }
          );
          const userJSON = await userResponse.json();

          const newChatObj: Chat = {
            id: chat._id,
            name: userJSON.name,
            profileImage: userJSON.profilePicture,
            lastMessage: messageJSON.messageBody,
            lastMessageTime: moment(messageJSON.timestamps).fromNow(),
            lastMessageTimestamp: messageJSON.timestamps,
          };
          tempChats.push(newChatObj);
        } else {
          const otherUser = chat.user1 == userId ? chat.user2 : chat.user1;
          const userResponse = await fetch(
            `https://fl-backend.vercel.app/user/${otherUser}`,
            {
              method: "GET",
              headers: {
                "Friends-Life-Signature": generateHmacSignature(
                  JSON.stringify({ userId: otherUser }),
                  API_SECRET
                ),
              },
            }
          );
          const userJSON = await userResponse.json();

          const newChatObj: Chat = {
            id: chat._id,
            name: userJSON.name,
            profileImage: userJSON.profilePicture,
            lastMessage: "No messages yet",
            lastMessageTime: "New Chat",
            lastMessageTimestamp: "",
          };

          tempChats.push(newChatObj);
        }
      }
      const sortedChats = tempChats.sort((a, b) => {
        // Convert to moment objects for comparison, assuming timestamps is in a compatible format
        return moment(b.lastMessageTimestamp).diff(
          moment(a.lastMessageTimestamp)
        );
      });

      setChats(sortedChats);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      checkApproved();

      setChats([]); // Clear chats before fetching new ones
      getChats();
    }, [])
  );
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setChats([]);
    getChats();
    // Fetch new data here...
    // After fetching data, set refreshing to false
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Messages</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setPopupVisible(true)}>
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
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate("Messages", {
                reciever: item.name,
                chatID: item.id,
                recieverID: undefined,
              })
            }>
            <Image
              source={{ uri: item.profileImage }}
              style={styles.profileImage}
            />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.lastMessage}>
                {item.lastMessage} · {item.lastMessageTime}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#f89b40"]} // Set the colors of the refresh indicator
            tintColor="#f89b40" // Set the color of the refresh indicator
          />
        }
      />
      {isPopupVisible && (
        <NewMessagePopup
          onClose={() => setPopupVisible(false)}
          navigation={navigation}
        />
      )}
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
