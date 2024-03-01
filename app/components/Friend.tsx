import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";

interface FriendProps {
  friend: {
    _id: string;
    friendName: string;
    profilePicture: any;
  };
  navigation: NavigationProp<any>;
}

const Friend: React.FC<FriendProps> = ({ friend, navigation }) => {
  const { friendName } = friend;

  const handlePress = () => {
    try {
      navigation.navigate("Report", { friend: friend });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.friendItem, { backgroundColor: "#F89B40" }]}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dvrcdxqex/image/upload/v1707870630/defaultProfilePic.png",
          }}
          style={styles.profileImage}
        />
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{friendName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    padding: 16, // Added padding to match the style
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendDetails: {
    marginLeft: 15,
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Friend;
