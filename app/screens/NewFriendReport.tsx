import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { RouteProp } from "@react-navigation/native";
import { generateHmacSignature } from "../utils/signature";
import { API_SECRET, API_URL } from "@env";
import useAuthStore from "../stores/auth";

interface RouterProps {
  route: RouteProp<{ params: { friend: any } }>;
  navigation: NavigationProp<any, any>;
}

const NewFriendReport = ({ navigation, route }: RouterProps) => {
  const { friend } = route.params;
  const [subject, setSubject] = useState("");
  const [textBox, setTextBox] = useState("");
  const { checkApproved } = useAuthStore();

  const handlePost = async () => {
    try {
      const response = await fetch(`${API_URL}report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Friends-Life-Signature": generateHmacSignature(
            JSON.stringify({
              reportBody: textBox,
              friendId: friend._id,
            }),
            API_SECRET
          ),
        },
        body: JSON.stringify({
          reportBody: textBox,
          friendId: friend._id,
        }),
      });
      if (response.ok) {
        navigation.navigate("Friends");
      }
    } catch (error) {
      console.error("Error creating report: ", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      checkApproved();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
              <BackButton />
            </TouchableOpacity>
            <Text style={styles.headerText}>New Friend Report</Text>
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
              placeholder="Report body:"
              multiline
              value={textBox}
              onChangeText={(text) => setTextBox(text)}
            />
          </View>

          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>Create Report</Text>
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
    paddingLeft: 10,
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

export default NewFriendReport;
