import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AdminLanding = () => {
  const handleRegisterNewFriend = () => {
    // Implement your logic for handling "Register New Friend"
    // You can navigate to the registration page or perform any other action.
  };

  const handleManageFriends = () => {
    // Implement your logic for handling "Manage Friends"
    // You can navigate to the friends management page or perform any other action.
  };

  const handleLogout = () => {
    // Implement your logic for logging out the admin
    // You can clear authentication tokens, navigate to the login page, etc.
  };

  return (
    <View style={styles.root}>
      <Image
        source={require('../../assets/friends-life-logo.png')} // Replace with your company logo image
        style={styles.logo}
      />
      <Text style={styles.welcome}>Welcome!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleRegisterNewFriend()}>
          <Text style={styles.buttonText}>Register New Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleManageFriends()}>
          <Text style={styles.buttonText}>Manage Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white', // White background
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150, // Adjust the size of the logo as needed
    height: 150,
  },
  title: {
    color: 'black', // Black text color
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  divider: {
    backgroundColor: '#000',
    height: 2,
    width: '80%',
    marginTop: 20,
    marginBottom: 30,
  },
  welcome: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  button: {
    backgroundColor: '#f89b40',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#818181',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButtonText: {
    color: 'white', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminLanding;
