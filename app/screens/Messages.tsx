import React, { useState } from "react";
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
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const Messages = ({navigation}: RouterProps) => {
  const route = useRoute();
  const personName = route.params?.reciever;
  //const navigation = useNavigation();

  //note that these are listed from newest to oldest.
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "user" },
    { id: "2", text: "Hi there!", sender: "other" },
    { id: "3", text: "How are you doing?", sender: "user" },
    { id: "4", text: "I'm good, thanks!", sender: "other" },
    { id: "5", text: "What have you been up to?", sender: "user" },
    { id: "6", text: "Not much, just working.", sender: "other" },
    { id: "7", text: "Do you have any plans for the weekend?", sender: "user" },
    { id: "8", text: "I'm going to a concert on Saturday.", sender: "other" },
    { id: "9", text: "Sounds like fun!", sender: "user" },
    {
      id: "10",
      text: "Yes, I'm really looking forward to it.",
      sender: "other",
    },
    { id: "11", text: "What kind of music do you like?", sender: "user" },
    { id: "12", text: "I enjoy rock and pop music.", sender: "other" },
    { id: "13", text: "Cool, I'm a fan of those genres too.", sender: "user" },
    {
      id: "14",
      text: "We should go to a concert together sometime.",
      sender: "other",
    },
    { id: "15", text: "That sounds like a great idea!", sender: "user" },
    { id: "16", text: "I'll check for upcoming concerts.", sender: "user" },
    { id: "17", text: "Sure, let me know!", sender: "other" },
    { id: "18", text: "Hey, did you watch that new movie?", sender: "user" },
    { id: "19", text: "Not yet, but I heard it's good.", sender: "other" },
    { id: "20", text: "We should watch it together sometime.", sender: "user" },
    { id: "21", text: "Definitely, I'm up for it!", sender: "other" },
    { id: "22", text: "What time works for you?", sender: "user" },
    { id: "23", text: "How about Saturday evening?", sender: "other" },
    { id: "24", text: "Sounds perfect!", sender: "user" },
    { id: "25", text: "I'll bring some snacks.", sender: "user" },
    { id: "26", text: "Great, I'll bring drinks!", sender: "other" },
    { id: "27", text: "Looking forward to it!", sender: "user" },
    { id: "28", text: "Me too, it'll be fun!", sender: "other" },
    { id: "29", text: "Hey, how's it going?", sender: "user" },
    { id: "30", text: "I'm good, thanks! How about you?", sender: "other" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        id: (messages.length + 1).toString(),
        text: newMessage,
        sender: "user",
      };
      setMessages([newMessageObj, ...messages]);
      console.log(messages);
      setNewMessage("");
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMessages(messages)}>
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{personName}</Text>
      </View>
      <View style={styles.divider} />
      <FlatList
        data={messages}
        //keyExtractor={item => item.id}
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
