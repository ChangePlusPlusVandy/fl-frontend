import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const RegisterFriend = () => {
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [family, setFamily] = useState('');

  const handleSignUp = () => {
    // Implement your logic for signing up here
    // You can use the 'photo', 'name', 'dob', and 'family' state values
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Photo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={text => setDob(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Family"
        value={family}
        onChangeText={text => setFamily(text)}
      />
      <TouchableOpacity style={styles.signupButton} onPress={() => handleSignUp()}>
        <Text style={styles.signupButtonText}>Register Friend</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '30%', // Shift down by 30% of the screen
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#818181',
    borderRadius: 12,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    width: '100%',
  },
  signupButton: {
    backgroundColor: '#f89b40',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  signupButtonText: {
    color: '#313b54',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterFriend;
