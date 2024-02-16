import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import Rohan from "../../assets/mrrashingkar.png";
import Post from "../components/Post";
import { generateHmacSignature } from "../utils/signature";
import { API_URL } from "@env";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface ReportItem {
  id: number;
  profilePic: any;
  profileName: string;
  profileLocation: string;
  profileTimePosted: string;
  bodyText: string;
}

const Report = ({ navigation }: RouterProps) => {
  const [name, setName] = useState("Rohan Rashingkar");
  const [reports, setReports] = useState<ReportItem[]>([
    {
      id: 1,
      profilePic: Rohan,
      profileName: "Rohan Rashingkar",
      profileLocation: "Org Room",
      profileTimePosted: "3 day ago",
      bodyText: "Nice!",
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
          <BackButton />
        </TouchableOpacity>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => navigation.navigate("AttendanceHistory")}>
            <Text style={styles.editText}>View Attendance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => navigation.navigate("NewFriendReport")}>
            <Text style={styles.editText}>Write New Report</Text>
          </TouchableOpacity>
        </View>
        {reports.map((report) => (
          <Post
            key={report.id}
            profilePic={report.profilePic}
            profileName={report.profileName}
            profileLocation={report.profileLocation}
            profileTimePosted={report.profileTimePosted}
            bodyText={report.bodyText}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingLeft: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "600",
    color: "grey",
  },
  nameText: {
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  edit: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#F89B40",
    borderRadius: 50,
    margin: "auto",
    alignSelf: "center",
    marginTop: 5,
    flexDirection: "row",
    gap: 10,
  },
  editText: {
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingBottom: 25,
  },
});

export default Report;
