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
} from 'react-native';

interface PostProps {
  profilePic: any;
  profileName: string;
  profileLocation: string;
  profileTimePosted: string;
  bodyPic?: any;
  bodyText: string;
}

const Post: React.FC<PostProps> = ({ profilePic, profileName, profileLocation, profileTimePosted, bodyPic, bodyText }) => {
  return (
        <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image source={profilePic} style={styles.postProfilePic} />
          <View>
            <Text style={styles.profileName}>{profileName}</Text>
            <Text style={styles.profileLocation}>{profileLocation}</Text>
          </View>
          <Text style={styles.profileTimePosted}>{profileTimePosted}</Text>
        </View>
        <View style={styles.postBody}>
          {bodyPic && <Image source={bodyPic} style={styles.postBodyImage} />}
          <Text style={styles.bodyText}>{bodyText}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    postContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      marginBottom: 10,
      marginHorizontal: 10
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    postProfilePic: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    profileLocation: {
      fontSize: 14,
      color: '#555',
    },
    profileTimePosted: {
      fontSize: 12,
      color: '#888',
      marginLeft: 'auto',
      marginTop: 5, 
      alignSelf: 'flex-start'
    },
    postBody: {
      marginTop: 20,
      marginBottom: 10,
    },
    bodyText: {
      textAlign: 'center',
    },
    postBodyImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
      borderRadius: 8,
      marginBottom: 10,
    },
    
  });

export default Post;