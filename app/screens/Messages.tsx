import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { generateHmacSignature } from "../utils/signature";
import { API_SECRET, API_URL } from "@env";
import useAuthStore from "../stores/auth";

interface Message {
  id: string;
  sender: string,
  text: string,
  time: string}
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const Messages = ({navigation}: RouterProps) => {
  const route = useRoute();
  const {reciever, chatID} = route.params;
  const { userId } = useAuthStore();

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(()=>{
    setMessages([])
    const getChats = async () =>{
      try{

        const chatResponse =  await fetch(`https://fl-backend.vercel.app/chat/${chatID}`, {
          method: "GET",
          headers: {
            "Friends-Life-Signature": generateHmacSignature(JSON.stringify({chatId: chatID}), API_SECRET),
          }
        })

      const chatJSON = await chatResponse.json();
      const messagePromises = chatJSON.messages.map(async message => {
        const messageStr = String(message);
        console.log("Message" + messageStr);
        const messageResponse = await fetch(`https://fl-backend.vercel.app/message/${messageStr}`, {
            method: "GET",
            headers: {
                "Friends-Life-Signature": generateHmacSignature(JSON.stringify({ messageId: message }), API_SECRET),
            }
        });
        const messageJSON = await messageResponse.json();
        console.log(messageJSON);
        return {
            id: messageStr,
            text: messageJSON.messageBody,
            sender: messageJSON.sender == userId ? "user" : "other",
            time: messageJSON.timestamps,
        };
    });
    Promise.all(messagePromises).then(messages => {
        setMessages(prevMessages => [...messages, ...prevMessages]);
        console.log(messages);
    }).catch(error => {
        console.log(error);
    });
  }    
      catch(error){
        console.log(error)
      }
    }

    getChats();
    }, [])
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        id: (messages.length + 1).toString(),
        text: newMessage,
        sender: "user",
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage("");
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
        keyExtractor={item => item.id}
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
    backgroundColor: "#868686",
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
    backgroundColor: "#001f3f",
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
