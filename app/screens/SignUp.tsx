import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
  Linking,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import useAuthStore, { CreateUserProps } from "../stores/auth";
import { useFirebase } from "../firebase";
import { getAuth } from "firebase/auth";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {
  const [form, setForm] = useState<CreateUserProps>({
    emailAddress: "",
    password: "",
    confirmPassword: "",
    username: "",
    type: "Family",
  });
  const { user, createAccount } = useAuthStore();
  const [secure, setSecure] = useState(true);
  const [agreedToEULA, setAgreedToEULA] = useState(false);
  const firebase = useFirebase();
  const auth = getAuth(firebase);

  if (user !== null) {
    navigation.navigate("UserTabs");
  }

  const handleAccountCreation = async () => {
    try {
      if (form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!agreedToEULA) {
        throw new Error("Please agree to the End User License Agreement");
      }

      await createAccount(form);

      navigation.navigate("SignIn");
    } catch (e) {
      alert(`An error has occurred: ${e}`);
    }
  };

  const updateForm = (updates: any) => {
    setForm({ ...form, ...updates });
  };

  const handleEULAPress = () => {
    Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View style={styles.root}>
            <View style={styles.wrapper}>
              <Text style={styles.signUp}>Sign Up</Text>
              <Text style={styles.getStarted}>Let's get you started</Text>
              <View style={styles.accountTypeContainer}>
                <Text>Account Type:</Text>
                <TouchableOpacity
                  style={[
                    styles.accountTypeButton,
                    form.type === "Staff" && styles.selectedAccountType,
                  ]}
                  onPress={() => updateForm({ type: "Staff" })}
                >
                  <Text>Staff</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.accountTypeButton,
                    form.type === "Family" && styles.selectedAccountType,
                  ]}
                  onPress={() => updateForm({ type: "Family" })}
                >
                  <Text>Family</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.boxLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={form.emailAddress}
                onChangeText={(text) => updateForm({ emailAddress: text })}
              />

              <Text style={styles.boxLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={form.username}
                onChangeText={(text) => updateForm({ username: text })}
              />

              <Text style={styles.boxLabel}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={secure}
                value={form.password}
                onChangeText={(text) => updateForm({ password: text })}
              />

              <Text style={styles.boxLabel}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={secure}
                value={form.confirmPassword}
                onChangeText={(text) => updateForm({ confirmPassword: text })}
              />

              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  onPress={() => setAgreedToEULA(!agreedToEULA)}
                >
                  <View style={styles.checkbox}>
                    {agreedToEULA && (
                      <Text style={styles.checkmark}>&#10003;</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.eulaText}>
                  I agree to the{" "}
                  <Text style={styles.linkText} onPress={handleEULAPress}>
                    End User License Agreement
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleAccountCreation}
              >
                <Text style={styles.createAccount}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signInLink}>
                <Text>
                  Already have an account?{" "}
                  <Text
                    style={styles.signIn}
                    onPress={() => navigation.navigate("SignIn")}
                  >
                    Sign In
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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  wrapper: {
    width: 0.8 * width,
    alignItems: "center",
  },
  signUp: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  getStarted: {
    fontSize: 16,
    color: "#818181",
    marginBottom: 20,
  },
  accountTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  accountTypeButton: {
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  selectedAccountType: {
    backgroundColor: "#f89b40",
  },
  input: {
    width: 340,
    height: 58,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
  },
  signUpButton: {
    position: "relative",
    backgroundColor: "#f89b40",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    marginBottom: 20,
    height: 70,
  },
  signInLink: {
    position: "relative",
    marginBottom: 10,
    color: "#f89b40",
  },
  boxLabel: {
    color: "#818181",
    fontSize: 17,
    marginBottom: 10,
    position: "relative",
    alignSelf: "flex-start",
  },
  createAccount: {
    fontSize: 20,
    position: "relative",
    textAlign: "center",
    fontWeight: "bold",
  },
  signIn: {
    color: "#f89b40",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#818181",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkmark: {
    fontSize: 18,
    color: "#818181",
  },
  eulaText: {
    fontSize: 16,
    color: "#818181",
  },
  linkText: {
    fontSize: 16,
    color: "#f89b40",
  },
});

export default SignUp;
