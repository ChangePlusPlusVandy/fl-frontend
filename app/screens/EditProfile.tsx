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
} from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import ProfilePicture from "../../assets/profilepicture.jpg";
import CameraIcon from "../../assets/camera.png";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const EditProfile = ({ navigation }: RouterProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView>
        <ScrollView>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <BackButton />
            </TouchableOpacity>
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>

          <View style={styles.profileContainer}>
            <Image source={ProfilePicture} style={styles.image}></Image>
            <TouchableOpacity>
              <Image source={CameraIcon} style={styles.cameraIcon}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              defaultValue="Joseph Quatela"
            ></TextInput>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              defaultValue="joseph.c.quatela@vanderbilt.edu"
            ></TextInput>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              defaultValue="954-593-3365"
            ></TextInput>
            <TouchableOpacity style={styles.save}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
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
    gap: 20,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "600",
  },
  image: {
    borderRadius: 100,
    width: 170,
    height: 170,
    alignSelf: "center",
  },
  profileContainer: {
    position: "relative",
    marginHorizontal: "auto",
    alignSelf: "center",
  },
  cameraIcon: {
    position: "absolute",
    width: 50,
    height: 50,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  label: {
    color: "#818181",
    fontSize: 17,
    fontWeight: "400",
    marginLeft: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F4F4F4",
    padding: 23,
    fontSize: 18,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 25,
  },
  save: {
    padding: 25,
    backgroundColor: "#F89B40",
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: 40,
  },
  saveText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default EditProfile;
