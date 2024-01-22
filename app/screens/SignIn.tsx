import React, {useEffect, useState} from 'react';
import {Button, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import FLlogo from "../../assets/friends-life-logo.png";
import OpenEye from "../../assets/OpenEye.png"
import ClosedEye from "../../assets/Eye-slash.png"
import useAuthStore, { SignInProps } from '../stores/auth';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignIn = ({ navigation }: RouterProps) => {
    const { user, signIn } = useAuthStore();
    const [form, setForm] = useState<SignInProps>({ emailAddress: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      if (user !== null) {
        navigation.navigate('Home');
      }
    }, [user]);

    const onLogin = async () =>{
        const { emailAddress, password } = form;

        try {
          await signIn({ emailAddress, password });
        } catch (error) {
          alert('Invalid credentials. Please try again.')
        }
    }

    return (
      <View style={styles.root}>
        <Text style={styles.login}>Login</Text>
        <Text style={styles.pleaseSignInToContinue}>Please sign in to continue</Text>
        <TouchableOpacity style={styles.donTHaveAnAccountSignUp}>
          <Text style={styles.labelWrapper}>
            <Text style={styles.label}>Don't have an account ?</Text>
            <Text style={styles.label2} onPress={() => navigation.navigate('SignUp')}> Sign up</Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.email}>Email</Text>
        <TextInput style={styles.usernameBox} onChangeText={(emailAddress: any) => setForm({ ...form, emailAddress })}></TextInput>
        <TextInput style={styles.passwordBox} secureTextEntry={!showPassword} onChangeText={(password: any) => setForm({ ...form, password })}></TextInput>
        {/* Add your vector and logo components */}
        <Text style={styles.password}>Password</Text>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <TouchableOpacity style={styles.loginBox} onPress={onLogin}>

      </TouchableOpacity>
      <Text style={styles.logIn}>Log in</Text>
        <Text style={styles.rememberMe}>Remember Me</Text>
        <Image source={showPassword ? ClosedEye: OpenEye} style={styles.vector}/>

        <TouchableOpacity style={styles.vector} onPress={()=>setShowPassword(!showPassword)}></TouchableOpacity>
        

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
      position: 'absolute',
      left: 26,
      top: 269,
    },
    pleaseSignInToContinue: {
      color: '#818181',
      fontSize: 16,
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
    },
    label: {
      color: '#818181',
      fontSize: 16,
    },
    label2: {
      color: '#f89b40',
      fontSize: 16,
      fontWeight: '500',
    },
    email: {
      color: '#818181',
      fontSize: 17,
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
      fontSize: 25,
      backgroundColor: '#f4f4f4',
    },
    passwordBox: {
      position: 'absolute',
      left: 25,
      top: 499,
      width: 340,
      height: 58,
      borderRadius: 9,
      fontSize: 25,
      backgroundColor: '#f4f4f4',
    },
    password: {
      color: '#818181',
      fontSize: 17,
      position: 'absolute',
      left: 25,
      top: 470,
    },
    forgotPassword: {
      color: '#000',
      fontSize: 15,
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
      position: 'absolute',
      left: 170,
      top: 660,
    },
    rememberMe: {
      color: '#000',
      fontSize: 15,
      position: 'absolute',
      left: 54,
      top: 566,
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
    vector: {
      position: 'absolute',
      left: '83.3333%',
      right: '11.4716%',
      top: '61.3%',
      overflow: 'visible',
      width: 13,
      height: 13,
      tintColor: 'grey',
    },
  });