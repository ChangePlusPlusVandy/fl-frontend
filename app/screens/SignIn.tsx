import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const SignIn = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Please sign in to continue
      </Text>
      <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={{ fontSize: 16 }}>Don't have an account ?</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>
          Sign up
        </Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20 }}>Email</Text>
      <TextInput
        style={{
          width: 300,
          height: 40,
          borderWidth: 1,
          borderColor: 'gray',
          marginBottom: 10,
        }}
      />
      <Text>Password</Text>
      <TextInput
        style={{
          width: 300,
          height: 40,
          borderWidth: 1,
          borderColor: 'gray',
          marginBottom: 10,
        }}
      />
      <Text style={{ marginTop: 10, color: 'blue' }}>Forgot Password?</Text>
      <TouchableOpacity
        style={{
          width: 300,
          height: 40,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white' }}>Log in</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text>Remember Me</Text>
        {/* You can add a checkbox or toggle switch here */}
      </View>
      {/* Vector and logo components */}
    </View>
  );
};

export default SignIn;
