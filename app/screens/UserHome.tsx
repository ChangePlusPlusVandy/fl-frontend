import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Button,
  } from "react-native";
import { NavigationProp, Router } from '@react-navigation/native';
import ProfilePic from "../../assets/User_circle.png"


interface RouterProps {
    navigation: NavigationProp<any, any>;
  }

const UserHome = ({ navigation }: RouterProps) => {
    const [name, setName] = useState('name');

    return (
      
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaView>
          <ScrollView>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Welcome </Text>
              <Text style={styles.nameText}>{name}!</Text>
              <Image source={ProfilePic} style={styles.profilePic} />
            </View>
            </ScrollView>
        </SafeAreaView>
        </KeyboardAvoidingView>

    )
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "600",
    color: "grey",
  },
  nameText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profilePic: {
    marginLeft: 'auto'
  },
});

export default UserHome;