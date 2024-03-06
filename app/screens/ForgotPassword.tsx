import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import BackButton from "../components/BackButton";
import { NavigationProp } from "@react-navigation/native";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useFirebase } from "../firebase";
import { Dimensions } from "react-native";

const firebase = useFirebase();
const auth = getAuth(firebase);

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const ForgotPassword = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "An email has been sent to reset your password. Please check your inbox and follow the directions."
      );
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Email not found");
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.wrapper}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                style={styles.backButton}>
                <BackButton />
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <View style={styles.emailWrapper}>
                <Text style={styles.emailInfo}>Please enter your email.</Text>
              </View>
              <TextInput
                style={styles.emailInput}
                placeholder="Email"
                onChangeText={(newValue) => setEmail(newValue)}
                defaultValue={email}
              />
              <TouchableOpacity
                style={styles.submitBox}
                onPress={handleEmailSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
              <Text style={styles.emailInfo2}>
                Note: If you enter an incorrect or invalid email, you will not
                be able to change your password.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    position: "relative",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingTop: 0.07 * height,
    gap: 20,
    width: width,
    backgroundColor: "#fff",
  },
  backButton: {
    backgroundColor: "#fff",
  },
  wrapper: {
    width: width,
    height: height,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  form: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
    width: width * 0.9,
    marginTop: 0.25 * height,
    alignItems: "center",
  },
  emailWrapper: {
    width: 0.8 * width,
    position: "relative",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  emailInfo: {
    fontSize: 0.05 * width,
    color: "#818181",
    position: "relative",
    alignItems: "flex-start",
    marginBottom: 0.02 * height,
  },
  emailInfo2: {
    fontSize: 0.04 * width,
    width: 0.8 * width,
    color: "#000",
    position: "relative",
    alignItems: "flex-start",
    marginTop: 0.02 * height,
    marginBottom: 0.02 * height,
  },
  emailInput: {
    position: "relative",
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    height: 0.06 * height,
    fontSize: 0.05 * width,
    width: 0.8 * width,
    padding: 10,
  },
  submitBox: {
    position: "relative",
    backgroundColor: "#F89B40",
    borderRadius: 10,
    height: 0.06 * height,
    marginBottom: 0.02 * height,
    marginTop: 0.02 * height,
    justifyContent: "center",
    alignItems: "center",
    width: 0.8 * width,
  },
  submitText: {
    fontSize: 0.05 * width,
    color: "#000",
    fontWeight: "bold",
  },
});

export default ForgotPassword;
