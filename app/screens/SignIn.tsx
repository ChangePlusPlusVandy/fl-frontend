import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Dimensions } from "react-native";

import FLlogo from "../../assets/friends-life-logo.png";
import useAuthStore, { SignInProps } from "../stores/auth";
import { generateHmacSignature } from "../utils/signature";
import { API_URL, API_SECRET } from "@env";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignIn = ({ navigation }: RouterProps) => {
  const { user, signIn, userId } = useAuthStore();
  const [form, setForm] = useState<SignInProps>({
    emailAddress: "",
    password: "",
  });
  const [userType, setUserType] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setForm({ emailAddress: "", password: "" });
    });

    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   const onSuccessfulSignIn = async () => {
  //     try {
  //       // Fetch user data
  //       const userData = await fetch(`${API_URL}user/${userId}`, {
  //         method: "GET",
  //         headers: {
  //           "Friends-Life-Signature": generateHmacSignature(
  //             JSON.stringify({ userId: userId }),
  //             API_SECRET
  //           ),
  //         },
  //       });

  //       // Parse user data
  //       const userInfo = await userData.json();
  //       setUserType(userInfo.type);
  //     } catch (error) {
  //       console.error("Error getting user type:", error);
  //       // Handle error fetching user data
  //     }
  //   };

  //   // If user is not null, attempt to fetch user data
  //   if (user) {
  //     onSuccessfulSignIn();
  //   }
  // }, [user, userId]); // Run this effect whenever user or userId changes

  // useEffect(() => {
  //   if (userType !== undefined) {
  //     if (userType === "Staff") {
  //       navigation.navigate("StaffTabs");
  //     } else if (userType === "Family") {
  //       navigation.navigate("UserTabs");
  //     } else {
  //       alert("Could not verify account type successfully");
  //     }
  //   }
  // }, [userType, navigation]);

  const onLogin = async () => {
    const { emailAddress, password } = form;
    try {
      await signIn({ emailAddress, password });
    } catch (error) {
      alert("Invalid credentials. Please try again.");
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
          <View style={styles.root}>
            <Image source={FLlogo} style={styles.logo} />
            <View style={styles.container}>
              <Text style={styles.login}>Login</Text>
              <Text style={styles.pleaseSignInToContinue}>
                Please sign in to continue
              </Text>

              <Text style={styles.email}>Email</Text>
              <TextInput
                style={styles.usernameBox}
                value={form.emailAddress}
                onChangeText={(emailAddress) =>
                  setForm({ ...form, emailAddress })
                }
              />

              <Text style={styles.password}>Password</Text>
              <TextInput
                style={styles.passwordBox}
                value={form.password}
                secureTextEntry={!showPassword}
                onChangeText={(password) => setForm({ ...form, password })}
              />
              {/* <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={showPassword ? ClosedEye : OpenEye}
                style={styles.eyeIcon}
              />
            </TouchableOpacity> */}

              <View style={styles.forgotPasswordWrap}>
                <Text
                  style={styles.forgotPassword}
                  onPress={() => navigation.navigate("ForgotPassword")}>
                  Forgot Password?
                </Text>
              </View>

              <TouchableOpacity style={styles.loginBox} onPress={onLogin}>
                <Text style={styles.loginLabel}>Log in</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signUp}>
                <Text style={styles.labelWrapper}>
                  <Text style={styles.label}>Don't have an account? </Text>
                  <Text
                    style={styles.label2}
                    onPress={() => navigation.navigate("SignUp")}>
                    Sign up
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    justifyContent: "center", // Center items vertically
    alignItems: "center", // Center items horizontally
    width: width,
    height: height,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "relative",
    width: 0.6 * width,
    height: 0.6 * width,
  },
  container: {
    width: 0.8 * width,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 0.04 * height,
  },
  login: {
    position: "relative",
    fontSize: 0.08 * width,
    fontWeight: "bold",
    color: "#000",
  },
  pleaseSignInToContinue: {
    position: "relative",
    fontSize: 0.04 * width,
    height: 0.05 * height,
    fontWeight: "normal",
    color: "#818181",
  },
  email: {
    position: "relative",
    fontSize: 0.05 * width,
    color: "#818181",
  },
  usernameBox: {
    position: "relative",
    height: 0.06 * height,
    backgroundColor: "#F4F4F4", // Light gray background color
    borderColor: "#F4F4F4",
    borderRadius: 10,
    padding: 10,
    fontSize: 0.05 * width,
  },
  password: {
    position: "relative",
    fontSize: 0.05 * width,
    color: "#818181",
    marginTop: 0.01 * height,
  },
  passwordBox: {
    position: "relative",
    height: 0.06 * height,
    backgroundColor: "#F4F4F4", // Light gray background color
    borderColor: "#F4F4F4",
    borderRadius: 10,
    padding: 10,
  },

  forgotPasswordWrap: {
    position: "relative",
    justifyContent: "flex-end", // Align to the end of the parent view
    alignSelf: "flex-end",
    marginTop: 0.01 * height,
  },
  forgotPassword: {
    fontSize: 0.03 * width,
    color: "#000",
  },
  loginBox: {
    position: "relative",
    backgroundColor: "#F89B40",
    borderRadius: 10,
    height: 0.06 * height,
    marginBottom: 0.02 * height,
    marginTop: 0.02 * height,
    justifyContent: "center", // Center items vertically
    alignItems: "center", // Center items horizontally
  },
  loginLabel: {
    fontSize: 0.05 * width,
    color: "#000",
    fontWeight: "bold",
  },
  signUp: {
    position: "relative",
    justifyContent: "center", // Center items vertically
    alignItems: "center", // Center items horizontally
  },
  labelWrapper: {
    fontSize: 0.04 * width,
    color: "#818181",
  },
  label: {
    fontSize: 0.04 * width,
    color: "#818181",
  },
  label2: {
    fontSize: 0.04 * width,
    color: "#F89B40",
  },
});
