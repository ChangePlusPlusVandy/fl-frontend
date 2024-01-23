import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import useAuthStore, { CreateUserProps } from '../stores/auth';
import { useFirebase } from '../firebase';
import { getAuth } from 'firebase/auth';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignUp = ({navigation}: RouterProps) => {
  const [form, setForm] = useState<CreateUserProps>({
    emailAddress: "",
    password: "",
    confirmPassword: "",
    username: "",
    type: "Staff",
  });
  const { user, createAccount } = useAuthStore();
  const [secure, setSecure] = useState(true);
  const firebase = useFirebase();
  const auth = getAuth(firebase);

  if (user !== null) {
    navigation.navigate('UserTabs');
  }

  const handleAccountCreation = async () => {
    try {
      if (form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      await createAccount(form);

      navigation.navigate('SignIn');
    } catch (e) {
      alert(`An error has occurred: ${e}`)
    }
  };

  const updateForm = (updates: any) => {
    setForm({ ...form, ...updates });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.signUp}>Sign Up</Text>
      <Text style={styles.getStarted}>Let's get you started</Text>
      <View style={styles.accountTypeContainer}>
        <Text>Account Type:</Text>
        <TouchableOpacity
          style={[
            styles.accountTypeButton,
            form.type === 'Staff' && styles.selectedAccountType,
          ]}
          onPress={() => updateForm({ type: 'Staff' })}
        >
          <Text>Staff</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.accountTypeButton,
            form.type === 'Family' && styles.selectedAccountType,
          ]}
          onPress={() => updateForm({ type: 'Family' })}
        >
          <Text>Family</Text>
        </TouchableOpacity>
      </View>
  
      <Text style = {styles.boxLabel}>Email</Text>

      <TextInput
        style={styles.input}
        value={form.emailAddress}
        onChangeText={text => updateForm({ emailAddress: text })}
      />
      
      <Text style ={styles.boxLabel}>Username</Text>
      <TextInput
        style={styles.input}
        value={form.username}
        onChangeText={text => updateForm({ username: text })}
      />
      <Text style = {styles.boxLabel}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={secure}
        value={form.password}
        onChangeText={text => updateForm({ password: text })}
      />
      <Text style ={styles.boxLabel}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={secure}
        value={form.confirmPassword}
        onChangeText={text => updateForm({ confirmPassword: text })}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleAccountCreation}>
        <Text style = {styles.createAccount}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInLink}>
        <Text>Already have an account? <Text style={styles.signIn} onPress={() => navigation.navigate('SignIn')}>Sign In</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
      signUp: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      getStarted: {
        fontSize: 16,
        color: '#818181',
        marginBottom: 20,
      },
      accountTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      accountTypeButton: {
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
      },
      selectedAccountType: {
        backgroundColor: '#f89b40',
      },
      input: {
        width: 340, 
        height: 58,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
      },
      signUpButton: {
        position: 'relative',
        top: 50,
        backgroundColor: '#f89b40',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 20,
        width: 370, 
        height: 70,
      },
      signInLink: {
        position: 'absolute',
        bottom: 50,
        marginBottom: 10,
        color: '#f89b40'
      },
      boxLabel: {
        color: '#818181',
        fontSize: 17,
        marginBottom: 10,
        position: 'relative',
        left: 20,
        alignSelf: 'flex-start'
      },
      createAccount:{
        fontSize: 20,
        position: 'relative',
        top: 8,
        textAlign: 'center',
      },
      signIn: {
        color: '#f89b40',
      },
});

export default SignUp;


