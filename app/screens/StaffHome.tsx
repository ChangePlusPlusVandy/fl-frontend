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
import ProfilePic from "../../assets/User_circle.png";
import AddPic from "../../assets/Add.png";
import Post from "../components/Post";
import { generateHmacSignature } from "../utils/signature";
import { API_URL, API_SECRET } from "@env";
import moment from "moment";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface PostItem {
  id: string;
  profilePic: any;
  profileName: string;
  profileTimePosted: string;
  bodyPic?: any;
  bodyText: string;
}

const StaffHome = ({ navigation }: RouterProps) => {
  const [name, setName] = useState("Staff");
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}post`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Friends-Life-Signature": generateHmacSignature("GET", API_SECRET),
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Map the fetched data to match the PostItem structure
          const formattedPosts = data.map((post: any) => ({
            id: post._id, // Use the actual MongoDB _id as the id
            profilePic: post.user, // Need to grab based off of user ID and fetch from users in mongo
            profileName: post.user, // Adjust this based on your model
            profileTimePosted: calculateTimeSincePost(post.dateCreated), // Calculate time since post
            bodyPic: post.image, // Adjust this based on your model
            bodyText: post.postBody, // Adjust this based on your model
          }));

          setPosts(formattedPosts.reverse());
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // Run only once on component mount

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
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Welcome </Text>
          <Text style={styles.nameText}>{name}!</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.profilePic}>
            <Image source={ProfilePic} />
          </TouchableOpacity>
        </View>

        {posts.map((post) => (
          <Post
            key={post.id}
            profilePic={post.profilePic}
            profileName={post.profileName}
            profileLocation={"Filler Location"}
            profileTimePosted={post.profileTimePosted}
            bodyPic={post.bodyPic}
            bodyText={post.bodyText}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addPic}
        onPress={() => navigation.navigate("NewPost")}>
        <Image source={AddPic} />
      </TouchableOpacity>
    </SafeAreaView>
  );
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
    marginLeft: "auto",
  },
  addPic: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default StaffHome;
