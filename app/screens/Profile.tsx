import useAuthStore from "../stores/auth";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import HelpIcon from "../../assets/helpicon.png";
import ChangePasswordIcon from "../../assets/passwordicon.png";
import AboutIcon from "../../assets/infoicon.png";
import LogoutIcon from "../../assets/logouticon.png";
import Arrow from "../../assets/arrow.png";
import DeleteIcon from "../../assets/deleteicon.png";
import DefaultProfilePicture from "../../assets/DefaultProfilePicture.png";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useFirebase } from "../firebase";
import { NavigationProp } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { API_URL, API_SECRET } from "@env";
import { generateHmacSignature } from "../utils/signature";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const firebase = useFirebase();
const auth = getAuth(firebase);

const Profile = ({ navigation }: RouterProps) => {
  const { user, logout, checkApproved, deleteAccount } = useAuthStore();
  const [userDetails, setUserDetails] = useState({
    name: "",
    emailAddress: "",
    profilePicture:
      "https://res.cloudinary.com/dvrcdxqex/image/upload/v1707870630/defaultProfilePic.png",
  });

  useFocusEffect(
    React.useCallback(() => {
      checkApproved();
      const fetchDetailsAsync = async () => {
        try {
          const fetchedDetails = await fetchUserData(); // Make sure this is correctly typed or casted

          if (fetchedDetails) {
            setUserDetails({
              name: fetchedDetails.name,
              emailAddress: fetchedDetails.emailAddress,
              profilePicture: fetchedDetails.profilePicture,
            });
          }
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      };

      fetchDetailsAsync();
    }, [])
  );

  const onLogout = async () => {
    try {
      await logout();
      // navigation.navigate("SignIn");
    } catch (error) {
      alert("Error logging out");
    }
  };

  const onAboutUs = async () => {
    Alert.alert(
      "Notice",
      "You're being redirected to https://friendslife.org/",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => Linking.openURL("https://friendslife.org/"),
        },
      ],
      { cancelable: false }
    );
  };

  const onHelpAndFeedback = async () => {
    Alert.alert(
      "We're Here to Help!",
      "Your feedback is valuable to us. If you have any questions, suggestions, or concerns, please reach out. Email us at friendslifedev@gmail.com, and we'll make sure to address your needs promptly.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  };

  const changePassword = async () => {
    Alert.alert(
      "Password Reset",
      "Are you sure you want to change your password?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () =>
            await sendPasswordResetEmail(auth, userDetails.emailAddress),
        },
      ],
      { cancelable: false }
    );
  };

  const onDeleteAccount = async () => {
    Alert.alert(
      "Account Deletion",
      "Are you sure you want to delete your account? (This is a permanent action)",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await deleteAccount();
            navigation.navigate("SignIn");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const fetchUserData = async () => {
    try {
      if (user) {
        const signature = generateHmacSignature(
          JSON.stringify({ firebaseId: user.uid }),
          API_SECRET
        );
        const response = await fetch(`${API_URL}user/firebase/${user.uid}`, {
          method: "GET",
          headers: {
            "Friends-Life-Signature": signature,
          },
        });
        const userData = await response.json();
        return {
          name: userData.name,
          emailAddress: userData.emailAddress,
          profilePicture: userData.profilePicture,
        };
      }
    } catch (error) {
      console.error("Network error fetching initial data: " + error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <BackButton />
        </TouchableOpacity>
      </View>
      <Image
        source={
          userDetails.profilePicture
            ? { uri: userDetails.profilePicture }
            : DefaultProfilePicture
        }
        style={styles.image}
      />

      <Text style={styles.name}>{userDetails.name}</Text>
      <Text style={styles.email}>{userDetails.emailAddress}</Text>
      <TouchableOpacity
        style={styles.edit}
        onPress={() => navigation.navigate("EditProfile")}>
        <Text style={styles.editText}>Edit Profile</Text>
        <Image source={Arrow} style={styles.editArrow}></Image>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <View>
        <TouchableOpacity style={styles.option} onPress={onHelpAndFeedback}>
          <Image source={HelpIcon} style={styles.icon}></Image>
          <Text style={styles.optionText}>Help and Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={changePassword}>
          <Image source={ChangePasswordIcon} style={styles.icon}></Image>
          <Text style={styles.optionText}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={onAboutUs}>
          <Image source={AboutIcon} style={styles.icon}></Image>
          <Text style={styles.optionText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={onDeleteAccount}>
          <Image source={DeleteIcon} style={styles.icon}></Image>
          <Text style={styles.optionText}>Delete account</Text>
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
