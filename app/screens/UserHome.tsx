import React, { useState } from "react";
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
import joeyProfile from "../../assets/profilepicture.jpg";
import AllanTennis from "../../assets/allantennis.png";
import Allan from "../../assets/mrzhang.png";
import Rohan from "../../assets/mrrashingkar.png";
import Alex from "../../assets/mrlin.png";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface PostItem {
  id: number;
  profilePic: any;
  profileName: string;
  profileLocation: string;
  profileTimePosted: string;
  bodyPic?: any;
  bodyText: string;
}

const UserHome = ({ navigation }: RouterProps) => {
  const [name, setName] = useState("Name");
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: 1,
      profilePic: Allan,
      profileName: "Allan Zhang",
      profileLocation: "Rohan's House",
      profileTimePosted: "1 day ago",
      bodyPic: AllanTennis,
      bodyText: "Ez Dubs",
    },
    {
      id: 2,
      profilePic: joeyProfile,
      profileName: "Joey Q",
      profileLocation: "Nashville, TN",
      profileTimePosted: "3 days ago",
      bodyText: "Lorem ipsum dolor sit amet, consectet",
    },
    {
      id: 3,
      profilePic: Rohan,
      profileName: "Rohan Rashingkar",
      profileLocation: "Sunnyvale",
      profileTimePosted: "1 month ago",
      bodyPic: Alex,
      bodyText: "Missing this cutie extra today",
    },
  ]);

  // const addPost = () => {

  // };

  // const deletePost = (postId: number) => {

  // };

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
            profileLocation={post.profileLocation}
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

export default UserHome;
