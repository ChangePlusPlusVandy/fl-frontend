import useAuthStore, { SignInProps } from "../stores/auth";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import ProfilePicture from "../../assets/profilepicture.jpg";
import HelpIcon from "../../assets/helpicon.png";
import ChangePasswordIcon from "../../assets/passwordicon.png";
import DeleteAccountIcon from "../../assets/deleteicon.png";
import AboutIcon from "../../assets/infoicon.png";
import LogoutIcon from "../../assets/logouticon.png";
import Arrow from "../../assets/arrow.png";

import { NavigationProp } from "@react-navigation/native";
import BackButton from "../components/BackButton";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Profile = ({ navigation }: RouterProps) => {
  const { logout } = useAuthStore();

  const onLogout = async () => {
    try {
      await logout();
      navigation.navigate('SignIn')

    } catch (error) {
      alert("Error logging out");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <Image source={ProfilePicture} style={styles.image}></Image>
      <Text style={styles.name}>Joseph Quatela</Text>
      <Text style={styles.email}>joseph.c.quatela@vanderbilt.edu</Text>
      <TouchableOpacity
        style={styles.edit}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.editText}>Edit Profile</Text>
        <Image source={Arrow} style={styles.editArrow}></Image>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <View>
        <TouchableOpacity style={styles.option}>
          <Image source={HelpIcon} style={styles.icon}></Image>
          <Text style={styles.optionText}>Help and Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Image source={ChangePasswordIcon} style={styles.icon}></Image>
          <Text style={styles.optionText}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Image source={DeleteAccountIcon} style={styles.icon}></Image>
          <Text style={styles.optionText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Image source={AboutIcon} style={styles.icon}></Image>
          <Text style={styles.optionText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stupidOption} onPress={onLogout}>
          <Image source={LogoutIcon} style={styles.stupidIcon}></Image>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    borderRadius: 100,
    width: 170,
    height: 170,
    alignSelf: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 5,
  },
  email: {
    fontSize: 18,
    fontWeight: "400",
    alignSelf: "center",
    color: "#ABABAB",
  },
  edit: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    backgroundColor: "#F89B40",
    borderRadius: 50,
    margin: "auto",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },
  editArrow: {
    width: 10,
    height: undefined,
    aspectRatio: 9 / 14,
  },
  editText: {
    fontWeight: "500",
  },
  divider: {
    backgroundColor: "#EFEFEF",
    height: 1,
    marginVertical: 20,
  },
  icon: {
    width: undefined,
    height: 35,
    aspectRatio: 1,
    resizeMode: "contain",
    marginLeft: 20,
  },
  stupidIcon: {
    width: undefined,
    height: 30,
    aspectRatio: 1,
    resizeMode: "contain",
    marginLeft: 22.5,
  },
  option: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 14,
  },
  stupidOption: {
    flexDirection: "row",
    gap: 22.5,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 20,
    color: "black",
    fontWeight: "500",
    alignSelf: "center",
  },
});

export default Profile;
