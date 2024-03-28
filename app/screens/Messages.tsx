import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { generateHmacSignature } from "../utils/signature";
import { API_SECRET, API_URL } from "@env";
import useAuthStore from "../stores/auth";

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
}

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Messages = ({ navigation }: RouterProps) => {
  const route = useRoute();
  const { userId, checkApproved } = useAuthStore();
  let { reciever, recieverID, chatID } = route.params as any;
  const [recieverId, setRecieverId] = useState(recieverID);
  const [chatId, setChatId] = useState(chatID);
  const [messages, setMessages] = useState<Message[]>([]);

  const getChats = async () => {
    try {
      setMessages([]);
      if (chatId) {
        const chatResponse = await fetch(
          `https://fl-backend.vercel.app/chat/${chatId}`,
          {
            method: "GET",
            headers: {
              "Friends-Life-Signature": generateHmacSignature(
                JSON.stringify({ chatId: chatId }),
                API_SECRET
              ),
            },
          }
        );
        const chatJSON = await chatResponse.json();

        setRecieverId(
          chatJSON.user1 === userId ? chatJSON.user2 : chatJSON.user1
        );

        const messagePromises = chatJSON.messages.map(async (message: any) => {
          const messageStr = String(message);

          const messageResponse = await fetch(
            `https://fl-backend.vercel.app/message/${messageStr}`,
            {
              method: "GET",
              headers: {
                "Friends-Life-Signature": generateHmacSignature(
                  JSON.stringify({ messageId: message }),
                  API_SECRET
                ),
              },
            }
          );
          const messageJSON = await messageResponse.json();
          return {
            id: messageStr,
            text: messageJSON.messageBody,
            sender: messageJSON.sender == userId ? "user" : "other",
            time: messageJSON.timestamps,
          };
        });
        Promise.all(messagePromises)
          .then((messages) => {
            setMessages((prevMessages) => [
              ...messages.reverse(),
              ...prevMessages,
            ]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateMessages = async () => {
    if (chatId) {
      try {
        const chatResponse = await fetch(
          `https://fl-backend.vercel.app/chat/${chatId}`,
          {
            method: "GET",
            headers: {
              "Friends-Life-Signature": generateHmacSignature(
                JSON.stringify({ chatId: chatId }),
                API_SECRET
              ),
            },
          }
        );
        const chatJSON = await chatResponse.json();

        const existingMessageIds = new Set(messages.map((msg) => msg.id)); // Assuming `id` is a unique identifier for each message
        console.log("Existing message IDs:", existingMessageIds);

        const messagePromises = chatJSON.messages.map(
          async (messageId: string) => {
            if (existingMessageIds.has(messageId)) return;
            console.log("Fetching message", messageId);
            const messageResponse = await fetch(
              `https://fl-backend.vercel.app/message/${messageId}`,
              {
                method: "GET",
                headers: {
                  "Friends-Life-Signature": generateHmacSignature(
                    JSON.stringify({ messageId }),
                    API_SECRET
                  ),
                },
              }
            );
            return await messageResponse.json();
          }
        );

        const newMessages = (await Promise.all(messagePromises))
          .filter(Boolean) // Remove nulls (messages we skipped)
          .map((messageJSON) => ({
            id: String(messageJSON._id), // Assuming `_id` is the identifier in your messageJSON
            text: messageJSON.messageBody,
            sender: messageJSON.sender === userId ? "user" : "other",
            time: messageJSON.timestamps,
          }));

        setMessages((prevMessages) => [...messages.reverse(), ...prevMessages]);
      } catch (error) {
        console.error("Error updating messages:", error);
      }
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkApproved();
    }, [])
  );

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      if (!chatId) {
        console.log("Creating new chat");
        const body2 = JSON.stringify({
          user1: userId,
          user2: recieverId,
          messages: [],
        });
        const chatResponse = await fetch(`${API_URL}chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Friends-Life-Signature": generateHmacSignature(body2, API_SECRET),
          },
          body: body2,
        });
        const chatResponseJSON = await chatResponse.json();
        setChatId(chatResponseJSON._id);

        const newMessageObj = {
          id: (messages.length + 1).toString(),
          text: newMessage,
          sender: "user",
          time: new Date().toISOString(),
        };

        const body1 = JSON.stringify({
          messageBody: newMessage,
          chatId: chatResponseJSON._id,
          sender: userId,
          recipient: recieverId,
        });

        await fetch(`${API_URL}message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Friends-Life-Signature": generateHmacSignature(body1, API_SECRET),
          },
          body: body1,
        });

        setMessages([newMessageObj, ...messages]);

        setNewMessage("");
      } else {
        const newMessageObj = {
          id: (messages.length + 1).toString(),
          text: newMessage,
          sender: "user",
          time: new Date().toISOString(),
        };

        const body = JSON.stringify({
          messageBody: newMessage,
          chatId: chatId,
          sender: userId,
          recipient: recieverId,
        });

        await fetch(`${API_URL}message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Friends-Life-Signature": generateHmacSignature(body, API_SECRET),
          },
          body: body,
        });

        setMessages([newMessageObj, ...messages]);

        setNewMessage("");
      }
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Conversations")}>
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{reciever}</Text>
      </View>
      <View style={styles.divider} />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={
              item.sender === "user" ? styles.userMessage : styles.otherMessage
            }>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        inverted={true}
        showsVerticalScrollIndicator={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <FontAwesome name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  divider: {
    height: 2, // Increased thickness
    backgroundColor: "#000", // Color set to black
    width: "100%", // Cover the whole width,
    marginTop: 15,
    marginBottom: 15,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#001f3f",
    borderRadius: 12,
    borderBottomRightRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: "70%",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#868686",
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#e4e4e4",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#f89b40",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Messages;
