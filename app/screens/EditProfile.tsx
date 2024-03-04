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
import React, { useState, useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import CameraIcon from "../../assets/camera.png";
import DefaultProfilePicture from "../../assets/DefaultProfilePicture.png";
import useAuthStore from "../stores/auth";
import { API_URL, API_SECRET } from "@env";
import { generateHmacSignature } from "../utils/signature";
import * as ImagePicker from "expo-image-picker";
import cld from "../utils/cloudinary";
import { upload } from "cloudinary-react-native";
import { useFocusEffect } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const EditProfile = ({ navigation }: RouterProps) => {
  const { user, userId } = useAuthStore();
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
  });

  const [image, setImage] = useState("");
  const [imageChanged, setImageChanged] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const fetchInitialData = async () => {
    try {
      if (user) {
        const signature = generateHmacSignature(
          JSON.stringify({ userId }),
          API_SECRET
        );
        const response = await fetch(`${API_URL}user/${userId}`, {
          method: "GET",
          headers: {
            "Friends-Life-Signature": signature,
          },
        });
        const userData = await response.json();
        setForm({
          fullName: userData.name,
          phoneNumber: userData.phoneNumber,
        });
        setImage(userData.profilePicture);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error: " + error.message);
      } else {
        console.error("Unexpected error");
      }
    }
  };

  const cloudinaryUpload = async () => {
    try {
      if (image !== "") {
        const options = {
          upload_preset: "ojyuicnt",
          unsigned: true,
        };

        await upload(cld, {
          file: image,
          options: options,
          callback: async (error: any, response: any) => {
            if (error) {
              console.error("Upload error:", error);
              return;
            }

            await fetch(`${API_URL}user/${userId}`, {
              method: "PATCH",
              headers: {
                "Friends-Life-Signature": generateHmacSignature(
                  JSON.stringify({ profilePicture: response.secure_url }),
                  API_SECRET
                ),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ profilePicture: response.secure_url }),
            });
          },
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const onSave = async () => {
    try {
      setDisabled(true);
      if (user) {
        if (imageChanged) await cloudinaryUpload();

        const userBody = {
          name: form.fullName,
          phoneNumber: form.phoneNumber,
        };

        const signature = generateHmacSignature(
          JSON.stringify(userBody),
          API_SECRET
        );

        await fetch(`${API_URL}user/${userId}`, {
          method: "PATCH",
          headers: {
            "Friends-Life-Signature": signature,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userBody),
        });
      }
      setDisabled(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error: " + error.message);
      } else {
        console.error("Unexpected error");
      }
    }
  };

  const pickImage = async () => {
    setImageChanged(true);
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setImageChanged(false);
      fetchInitialData();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <BackButton />
            </TouchableOpacity>
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>

          <View style={styles.profileContainer}>
            <Image
              source={
                image && image.trim() !== ""
                  ? { uri: image }
                  : DefaultProfilePicture
              }
              style={styles.image}
            />
            <TouchableOpacity
              onPress={async () => {
                await pickImage();
              }}>
              <Image source={CameraIcon} style={styles.cameraIcon}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={form.fullName}
              onChangeText={(text) => setForm({ ...form, fullName: text })}
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={form.phoneNumber}
              onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
            />
            <TouchableOpacity
              style={styles.save}
              onPress={async () => {
                await onSave();
                navigation.navigate("Profile");
              }}
              disabled={disabled}>
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
