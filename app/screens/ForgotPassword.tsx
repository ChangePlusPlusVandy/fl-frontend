import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  sendPasswordResetEmail,
  confirmPasswordReset,
  getAuth,
} from "firebase/auth";
import { useFirebase } from "../firebase";
import { Dimensions } from "react-native";
import useAuthStore from "../stores/auth";
import { API_URL, API_SECRET } from "@env";
import { generateHmacSignature } from "../utils/signature";
import { useFocusEffect } from "@react-navigation/native";

const firebase = useFirebase();
const auth = getAuth(firebase);

const ForgotPassword = () => {
  const { userId } = useAuthStore();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [code, setCode] = useState("");

  const getUser = async () => {
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

      const user = await userData.json();

      setEmail(user.emailAddress);

      await handleEmailSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCodeSubmit = async () => {
    try {
      await confirmPasswordReset(auth, code, email);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log(userId);
      if (userId) getUser();
    }, [])
  );

  return (
    <View>
      {userId && (
        <View>
          <Text>
            Please enter the email associated to your account, and we'll send
            you a code to reset your password
          </Text>
          <TextInput
            placeholder="Email"
            onChangeText={(newValue) => setEmail(newValue)}
            defaultValue={email}
            editable={!emailSent}
          />
          <TouchableOpacity
            style={styles.submitBox}
            onPress={handleEmailSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      {emailSent && (
        <View>
          <Text>Please input the verification code</Text>
          <TextInput
            placeholder="Code"
            onChangeText={(newValue) => setCode(newValue)}
            defaultValue={code}
          />
          <TouchableOpacity style={styles.submitBox} onPress={handleCodeSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  form: {
    position: "relative",
    backgroundColor: "#F89B40",
    borderRadius: 10,
    height: 0.06 * height,
    marginBottom: 0.02 * height,
    marginTop: 0.02 * height,
    justifyContent: "center",
    alignItems: "center",
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
  },
  submitText: {
    fontSize: 0.05 * width,
    color: "#000",
    fontWeight: "bold",
  },
});

export default ForgotPassword;
