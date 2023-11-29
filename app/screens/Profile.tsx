import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ProfilePicture from "../../assets/profilepicture.jpg";

const Profile = () => {
  return (
    <View>
      <Image source={ProfilePicture}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
  },
});

export default Profile;
