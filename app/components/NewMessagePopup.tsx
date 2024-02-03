import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native';
import { Modal,  FlatList} from 'react-native';

const NewMessagePopup = ({onClose, navigation }) => {
  const [searchText, setSearchText] = useState('');

  // Sample user data (replace with your actual user data)
  const users = [];

  for (let i = 1; i <= 100; i++) {
    const user = {
      id: i,
      name: `User ${i}`,
      profileImage: require("../../assets/friends-life-logo.png"),
    };
    users.push(user);
  }

  const handleUserClick = (user) => {
    // Close the popup
    onClose();

    // Navigate to the Message component with the selected user
    navigation.navigate('Messages', { reciever: user.name });
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
 data = {users
          .filter((user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
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