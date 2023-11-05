import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

import FLlogo from "../../assets/friends-life-logo.png";
const SignIn = () => {
    return (
      <View style={styles.root}>
        <Text style={styles.login}>Login</Text>
        <Text style={styles.pleaseSignInToContinue}>Please sign in to continue</Text>
        <TouchableOpacity style={styles.donTHaveAnAccountSignUp}>
          <Text style={styles.labelWrapper}>
            <Text style={styles.label}>Don't have an account ?</Text>
            <Text style={styles.label2}> Sign up</Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.email}>Email</Text>
        <TextInput style={styles.usernameBox}></TextInput>
        <View style={styles.passwordBox}></View>
        {/* Add your vector and logo components */}
        <Text style={styles.password}>Password</Text>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <View style={styles.loginBox}></View>
        <Text style={styles.logIn}>Log in</Text>
        <Text style={styles.rememberMe}>Remember Me</Text>
        {/* Add your vector329 component */}
        {/* Add your logo component */}
        <Image source={FLlogo} style={styles.screenshot2023114At1171}/>
      </View>
    );
  };
  

export default SignIn;

const styles = StyleSheet.create({
    root: {
      position: 'relative',
      width: 390,
      height: 844,
      alignItems: 'flex-start',
      backgroundColor: '#fff',
      overflow: 'hidden',
    },
    login: {
      color: '#000',
      fontSize: 29,
      fontWeight: '600',
      fontFamily: 'Poppins',
      position: 'absolute',
      left: 26,
      top: 269,
    },
    pleaseSignInToContinue: {
      color: '#818181',
      fontSize: 16,
      fontFamily: 'Poppins',
      position: 'absolute',
      left: 25,
      top: 313,
    },
    donTHaveAnAccountSignUp: {
      position: 'absolute',
      left: 65,
      top: 799,
    },
    labelWrapper: {
      fontSize: 16,
      fontFamily: 'Poppins',
    },
    label: {
      color: '#818181',
      fontSize: 16,
      fontFamily: 'Poppins',
    },
    label2: {
      color: '#f89b40',
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Poppins',
    },
    email: {
      color: '#818181',
      fontSize: 17,
      fontFamily: 'Poppins',
      position: 'absolute',
      left: 25,
      top: 364,
    },
    usernameBox: {
      position: 'absolute',
      left: 25,
      top: 393,
      width: 340,
      height: 58,
      borderRadius: 9,
      backgroundColor: '#f4f4f4',
    },
    passwordBox: {
      position: 'absolute',
      left: 25,
      top: 499,
      width: 340,
      height: 58,
      borderRadius: 9,
      backgroundColor: '#f4f4f4',
    },
    password: {
      color: '#818181',
      fontSize: 17,
      fontFamily: 'Poppins',
      position: 'absolute',
      left: 25,
      top: 470,
    },
    forgotPassword: {
      color: '#000',
      fontSize: 15,
      fontFamily: 'Poppins',
      position: 'absolute',
      left: 233,
      top: 566,
    },
    loginBox: {
      position: 'absolute',
      left: 17,
      top: 641,
      width: 357,
      height: 63,
      borderRadius: 12,
      backgroundColor: '#f89b40',
    },
    logIn: {
      color: '#313b54',
      fontSize: 17,
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      position: 'absolute',
      left: 170,
      top: 660,
    },
    rememberMe: {
      color: '#000',
      fontSize: 15,
      fontFamily: 'Poppins',
      position: 'absolute',
      left: 54,
      top: 566,
    },
    // Add styles for vector and logo components
    vector329: {
      position: 'absolute',
      left: 1600.5,
      top: 150,
      width: 31,
      height: 15.5,
      overflow: 'visible',
    },
    // Add styles for your logo component
    logo: {
      position: 'absolute',
      left: 78,
      top: -9,
      width: 235,
      height: 278,
    },
    // Add styles for screenshot2023114At1171 component
    screenshot2023114At1171: {
      position: 'absolute',
      left: 75,
      top: 18,
      width: 239,
      height: 232,
      // Add background image styling here
    },
  });