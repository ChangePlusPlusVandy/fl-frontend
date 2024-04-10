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
import ReportIcon from "../../assets/threedots.png";
import { Dropdown } from "react-native-element-dropdown";
import { NavigationProp } from "@react-navigation/native";

interface PostProps {
  post: {
    key: string;
    user: string;
    profileLocation: string;
    profileTimePosted: string;
    bodyPic?: any;
    bodyText: string;
  };
  navigation: NavigationProp<any>;
}

const Post: React.FC<PostProps> = ({ post, navigation }) => {
  const [profileName, setProfileName] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [userType, setUserType] = useState("");
  const { key, user, profileLocation, profileTimePosted, bodyPic, bodyText } =
    post;
  const { userId } = useAuthStore();

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

    setUserType(user.type);

    setProfileName(user.name);
    setProfilePic(user.profilePicture);
  };

  const handleDropdownChange = async (option: any) => {
    const userData = await fetch(`${API_URL}user/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Friends-Life-Signature": generateHmacSignature(
          JSON.stringify({ userId: user }),
          API_SECRET
        ),
      },
    });

    const postUser = await userData.json();

    switch (option.value) {
      case "block":
        Alert.alert(
          "Block user",
          `Are you sure you want to block ${postUser.name}?`,
          [
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: async () => {
                await fetch(`${API_URL}user/blockUser`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Friends-Life-Signature": generateHmacSignature(
                      JSON.stringify({ userId: userId, blockId: user }),
                      API_SECRET
                    ),
                  },
                  body: JSON.stringify({ userId: userId, blockId: user }),
                });
                if (userType === "Family") {
                  navigation.navigate("Profile");
                } else {
                  navigation.navigate("Profile");
                }
              },
            }, // Implement block logic here
          ]
        );
        break;
      case "report":
        Alert.alert("Report", `Are you sure you want to report this post?`, [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              await fetch(`${API_URL}user/reportPost`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Friends-Life-Signature": generateHmacSignature(
                    JSON.stringify({ userId: userId, postId: key }),
                    API_SECRET
                  ),
                },
                body: JSON.stringify({ userId: userId, postId: key }),
              });
              navigation.navigate("Profile");
            },
          }, // Implement report logic here
        ]);
        break;
      default:
        console.log("No action selected");
    }
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
            }}>
            <View style={styles.nameHeader}>
              <Text style={styles.profileName}>{profileName}</Text>
              <Text>.</Text>
              <Text style={styles.profileTimePosted}>{profileTimePosted}</Text>
            </View>
          </View>

          <Text style={styles.profileLocation}>Friends Life</Text>
        </View>
        <Dropdown
          data={[
            { label: "Block User", value: "block" },
            { label: "Report Post", value: "report" },
          ]}
          onChange={handleDropdownChange} // Updated to use the new handler
          placeholder=""
          labelField="label"
          valueField="value"
          style={styles.ellipsisButton}
        />
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
  ellipsisButton: {
    position: "absolute",
    top: 0, // Adjust this as needed
    right: 0, // Adjust if you need some margin
    width: 150,
    padding: 20, // Add padding to increase the touchable area
  },
});

export default Post;
