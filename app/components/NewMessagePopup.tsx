import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native';
import { Modal,  FlatList} from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import moment from "moment";
import { API_SECRET, API_URL } from "@env";
import { generateHmacSignature } from "../utils/signature";
import useAuthStore from "../stores/auth";

const NewMessagePopup = ({onClose, navigation }) => {
  const [searchText, setSearchText] = useState('');
  const { userId } = useAuthStore();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/user`, {
          method: "GET",
          headers: {
            "Friends-Life-Signature": generateHmacSignature("GET", API_SECRET),
          }
        });
        const userJSON = await response.json();
        setUsers(userJSON); // Set the users array in the state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call the function to fetch users when the component mounts
  }, []); 

  const handleUserClick = async (user) => {
    // Close the popup
    onClose();
    const chats = await fetch(`${API_URL}/chat`, {
      method: "GET",
      headers: {
        "Friends-Life-Signature": generateHmacSignature("GET", API_SECRET),
      }
    });
    const chatJSON = await chats.json();
    //check if there's already messages between these people
    for(const chat of chatJSON){
      console.log(chat)

      if((chat.user1 == userId && chat.user2 == user._id) || (chat.user1 == user._id && chat.user2 == userId)){
        navigation.navigate('Messages', { reciever: user.name, chatID: chat._id, recieverID: undefined});
      }
    }
    // Navigate to the Message component with the selected user
    navigation.navigate('Messages', { reciever: user.name, chatID: undefined, recieverID: user._id });
  };

  return (
    <Modal style={styles.modal}>
      <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style = {styles.closeButtonText}>X</Text>
</TouchableOpacity>
        <TextInput
          placeholder="Search users..."
          style={styles.input}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <View style={styles.listContainer}>
        <FlatList style={styles.list}
 data = {Array.isArray(users) ? users.filter((user) =>
  user.name.toLowerCase().includes(searchText.toLowerCase())
) : []}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({item})=>(<TouchableOpacity
            onPress={() => handleUserClick(item)}
            style={styles.userItem}
          >
          <Image source={item.profileImage} style={styles.userImage} />
            <Text style={styles.userName}>{item.name}</Text>
          </TouchableOpacity>)}
        >          </FlatList>
        </View></View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'absolute', 
        top: 0, left: 0, 
        right: 0, bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'

      },
  input: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 30,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    height: '25%', // Set the height to one-quarter of the container's height
    marginBottom: 10,
  },
  list: {
    flex: 1, // Allow the list to expand to fill the available space
  },
  closeButton: {
    position: 'relative',
    bottom: 30, // Adjust the top position as needed
    left: 100, // Adjust the right position as needed
  },
});

export default NewMessagePopup;