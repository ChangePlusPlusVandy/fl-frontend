import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Post from "../components/Post";
import { generateHmacSignature } from "../utils/signature";
import { API_URL, API_SECRET } from "@env";
import moment from "moment";
import useAuthStore from "../stores/auth";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface PostItem {
  id: string;
  user: string;
  profileTimePosted: string;
  bodyPic?: any;
  bodyText: string;
}

const UserHome = ({ navigation }: RouterProps) => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const { userId, checkApproved } = useAuthStore();
  const [userDetails, setUserDetails] = useState({
    name: "",
    profilePicture:
      "https://res.cloudinary.com/dvrcdxqex/image/upload/v1707870630/defaultProfilePic.png",
  });

  useFocusEffect(
    React.useCallback(() => {
      checkApproved();
      setPosts([]);

      const fetchPosts = async () => {
        try {
          const user = await fetch(`${API_URL}user/${userId}`, {
            method: "GET",
            headers: {
              "Friends-Life-Signature": generateHmacSignature(
                JSON.stringify({ userId }),
                API_SECRET
              ),
            },
          });

          const userData = await user.json();
          const blockedUsers = userData.blockedUsers;

          const response = await fetch(`${API_URL}post`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Friends-Life-Signature": generateHmacSignature(
                "GET",
                API_SECRET
              ),
            },
          });

          console.log(userData);

          if (response.ok) {
            const data = await response.json();

            const formattedPosts = data.map((post: any) => ({
              key: post._id,
              user: post.userId,
              profileTimePosted: calculateTimeSincePost(post.dateCreated),
              bodyPic: post.image,
              bodyText: post.postBody,
            }));

            setPosts(
              formattedPosts
                .filter((post: any) => !blockedUsers.includes(post.user))
                .reverse()
            );
          } else {
            console.error("Failed to fetch posts");
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      const updateUserInfo = async () => {
        try {
          const userData = await fetch(`${API_URL}user/${userId}`, {
            method: "GET",
            headers: {
              "Friends-Life-Signature": generateHmacSignature(
                JSON.stringify({ userId: userId }),
                API_SECRET
              ),
            },
          });

          const userInfo = await userData.json();
          setUserDetails({
            name: userInfo.name.split(" ")[0],
            profilePicture: userInfo.profilePicture,
          });
        } catch (error) {
          console.error("Error getting name:", error);
        }
      };

      updateUserInfo();
      fetchPosts();
    }, [])
  );
  // Run only once on component mount

  // Function to calculate time since post
  const calculateTimeSincePost = (postTime: string) => {
    const postMoment = moment(postTime);
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(postMoment));
    const years = duration.asYears();
    const months = duration.asMonths();
    const days = duration.asDays();
    const hours = duration.asHours();
    const minutes = duration.asMinutes();
    const seconds = duration.asSeconds();

    if (years >= 1) {
      return `${Math.round(years)} years ago`;
    } else if (months >= 1) {
      return `${Math.round(months)} months ago`;
    } else if (days >= 1) {
      return `${Math.round(days)} days ago`;
    } else if (hours >= 1) {
      return `${Math.round(hours)} hours ago`;
    } else if (minutes >= 1) {
      return `${Math.round(minutes)} minutes ago`;
    } else {
      return `${Math.round(seconds)} seconds ago`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.nameWrapper}>
          <Text style={styles.headerText}>Welcome </Text>
          <Text style={styles.nameText}>{userDetails.name}!</Text>
        </View>

        <View style={styles.profilePic}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{ uri: userDetails.profilePicture }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {posts.map((post: any) => (
          <Post post={post} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    width: width,
  },
  nameWrapper: {
    width: width * 0.7,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.04,
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
    position: "relative",
    marginRight: 0,
    width: 0.3 * width,

    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    overflow: "hidden",
    borderRadius: 100,
    resizeMode: "cover",
    width: width * 0.15,
    height: width * 0.15,
  },
});

export default UserHome;
