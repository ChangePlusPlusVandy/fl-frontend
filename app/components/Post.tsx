import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import useAuthStore from "../stores/auth";
import { generateHmacSignature } from "../utils/signature";
import { API_SECRET, API_URL } from "@env";
import ReportIcon from "../../assets/reporticon.png";

interface PostProps {
  key: string;
  user: string;
  profileLocation: string;
  profileTimePosted: string;
  bodyPic?: any;
  bodyText: string;
}

const Post: React.FC<PostProps> = ({
  key,
  user,
  profileLocation,
  profileTimePosted,
  bodyPic,
  bodyText,
}) => {
  const [profileName, setProfileName] = useState("");
  const [profilePic, setProfilePic] = useState();

  const getUser = async (userId: string) => {
    const userData = await fetch(`${API_URL}user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Friends-Life-Signature": generateHmacSignature(
          JSON.stringify({ userId }),
          API_SECRET
        ),
      },
    });

    const user = await userData.json();

    setProfileName(user.name);
    setProfilePic(user.profilePicture);
  };

  const report = () => {
    Alert.alert(
      "Report Post?",
      "Please confirm if this post violates guidelines.",
      [
        {
          text: "Confirm",
          onPress: () => console.log("Confirmed"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancelled"),
        },
      ]
    );
  };

  useEffect(() => {
    getUser(user);
  }, [user]);

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: profilePic }} style={styles.postProfilePic} />
        <View>
          <View
            style={{
              flexDirection: "row",
              width: "auto",
            }}
          >
            <View style={styles.nameHeader}>
              <Text style={styles.profileName}>{profileName}</Text>
              <Text>.</Text>
              <Text style={styles.profileTimePosted}>{profileTimePosted}</Text>
            </View>
          </View>

          <Text style={styles.profileLocation}>Friends Life</Text>
        </View>
        <TouchableOpacity style={styles.reportIconButton} onPress={report}>
          <Image source={ReportIcon} style={styles.reportIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.postBody}>
        {bodyPic && bodyPic !== "test" && (
          <Image source={{ uri: bodyPic }} style={styles.postBodyImage} />
        )}
        <Text style={styles.bodyText}>{bodyText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  postProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileLocation: {
    fontSize: 14,
    color: "#555",
  },
  profileTimePosted: {
    fontSize: 12,
    color: "#888",
    marginLeft: "auto",
    alignSelf: "flex-start",
    marginTop: 4,
  },
  postBody: {
    marginTop: 20,
    marginBottom: 10,
  },
  bodyText: {
    textAlign: "center",
  },
  postBodyImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  nameHeader: {
    flexDirection: "row",
    gap: 5,
  },
  reportIcon: {
    width: 30,
    height: 30,
  },
  reportIconButton: {
    marginLeft: "auto",
  },
});

export default Post;
