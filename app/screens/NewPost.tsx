import React, { useState } from "react";
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
import { NavigationProp, Router } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import fileUploadIcon from "../../assets/file_upload.png";
import linkUploadIcon from "../../assets/link_upload.png";
import imgUploadIcon from "../../assets/img_upload.png";
import { AdvancedImage, upload } from "cloudinary-react-native";
import cld from "../utils/cloudinary";
import * as ImagePicker from "expo-image-picker";
import { generateHmacSignature } from "../utils/signature";
import { API_URL, API_SECRET } from "@env";
import useAuthStore from "../stores/auth";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const NewPost = ({ navigation }: RouterProps) => {
  const [subject, setSubject] = useState("");
  const [textBox, setTextBox] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const { user } = useAuthStore();

  const cloudinaryUpoad = async () => {
    let cloudinaryId = "";
    console.log(imageUri);
    if (imageUri) {
      const options = {
        upload_preset: "ojyuicnt",
        unsigned: true,
      };

      await upload(cld, {
        file: imageUri,
        options: options,
        callback: (error: any, response: any) => {
          if (error) {
            console.error("Upload error:", error);
            return;
          }
          console.log("Upload successful:", response);
          cloudinaryId = response.public_id;
        },
      });
    }
  };

  const handlePost = async () => {
    try {
      cloudinaryUpoad();
      const userData = await fetch(`${API_URL}user/firebase/${user?.uid}`, {
        method: "GET",
        headers: {
          "Friends-Life-Signature": generateHmacSignature(
            JSON.stringify({ _id: userId }),
            API_SECRET
          ),
        },
      });

      const userInfo = await userData.json();

      const body = {
        userId: userInfo._id,
        user: userInfo.name,
        title: subject,
        postBody: textBox,
        image: "test",
      };
      const signature = generateHmacSignature(JSON.stringify(body), API_SECRET);
      const response = await fetch("https://fl-backend.vercel.app/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Friends-Life-Signature": signature,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Post created successfully");
        navigation.navigate("StaffTabs");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleUploadImageFromPhone = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <BackButton />
            </TouchableOpacity>
            <Text style={styles.headerText}>New Post</Text>
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={[styles.input, { fontSize: 34 }]}
              placeholder="Subject"
              value={subject}
              onChangeText={(text) => setSubject(text)}
            />

            <View style={styles.line}></View>

            <TextInput
              style={styles.textBox}
              placeholder="What's on your mind?"
              multiline
              value={textBox}
              onChangeText={(text) => setTextBox(text)}
            />
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <View style={styles.uploadContainer}>
              <TouchableOpacity
                style={styles.uploadIcon}
                onPress={handleUploadImageFromPhone}
              >
                <Image source={imgUploadIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.postButton}
            onPress={() => handlePost()}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    marginBottom: 20,
    paddingBottom: 20,
    gap: 20,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  headerText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "600",
    paddingLeft: 60,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputBox: {
    marginTop: 20,
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 15, // Adjust the margin as needed
    marginBottom: 50,
  },
  input: {
    height: 50,
    margin: 10,
    padding: 10,
  },
  textBox: {
    height: 200,
    margin: 10,
    padding: 10,
    textAlignVertical: "top", // Ensure multiline text starts from the top
  },
  line: {
    height: 1,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 15,
  },
  uploadIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  postButton: {
    backgroundColor: "#FFA500",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  postButtonText: {
    color: "black",
    fontSize: 18,
  },
});

export default NewPost;
