import React, { useEffect, useState } from 'react';
import { Text, Alert, Button, View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';

export const SignIn =()=> {

    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onLogin = ()=>{
        alert(username)
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.container}>
            <Text style = >Email</Text>
          <TextInput
            value={username}
            onChangeText={(newUsername) => setUsername(newUsername)}
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={(newPassword) => setPassword(newPassword)}
            secureTextEntry={true}
            style={styles.input}
          />
          <View style = {styles.button}>
          <Button
            title={'Login'}
            onPress={()=>onLogin()}          
            />
            </View>
        </View>
        </TouchableWithoutFeedback>
      );
  }



  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  button:{
    backgroundColor:'orange',
    fontSize: 100,
    width: 100,
    color: 'green',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    fontSize: 25,
    borderWidth: 0,
    borderColor: 'black',
    marginBottom: 10,
    backgroundColor: '#EEE'
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign:'center',
    fontWeight:'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});