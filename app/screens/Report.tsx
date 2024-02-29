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
import moment from "moment";
import Post from "../components/Post";
import { generateHmacSignature } from "../utils/signature";
import { API_SECRET, API_URL } from "@env";
import { RouteProp } from "@react-navigation/native";
import useAuthStore from "../stores/auth";

interface RouterProps {
  route: RouteProp<{ params: { friend: any } }>;
  navigation: NavigationProp<any, any>;
}

interface ReportItem {
  _id: string;
  friendId: string;
  reportBody: string;
  date: string;
}

const Report = ({ route, navigation }: RouterProps) => {
  const { friend } = route.params;
  const { userId } = useAuthStore();

  const [reports, setReports] = useState<ReportItem[]>([]);
  const [showNewReport, setShowNewReport] = useState(false);

  const getReports = async () => {
    try {
      const reportIds = friend.reports;

      const fetchedReports: ReportItem[] = await Promise.all(
        reportIds.map(async (reportId: string) => {
          const response = await fetch(`${API_URL}report/${reportId}`, {
            method: "GET",
            headers: {
              "Friends-Life-Signature": generateHmacSignature(
                JSON.stringify({ reportId }),
                API_SECRET
              ),
            },
          });
          return await response.json();
        })
      );

      fetchedReports.sort((a, b) => {
        return moment(b.date).valueOf() - moment(a.date).valueOf();
      });

      setReports(fetchedReports);
    } catch (error) {
      console.error("Error fetching friend data: ", error);
    }
  };

  const getUserType = async () => {
    try {
      const response = await fetch(`${API_URL}user/${userId}`, {
        method: "GET",
        headers: {
          "Friends-Life-Signature": generateHmacSignature(
            JSON.stringify({ userId }),
            API_SECRET
          ),
        },
      });
      const data = await response.json();
      setShowNewReport(data.type === "Staff");
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    setReports([]);
    getReports();
    getUserType();
  }, []);

  const calculateTimeSincePost = (postTime: string) => {
    const postMoment = moment(postTime);
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(postMoment));

    if (duration.asYears() >= 1) {
      return `${Math.round(duration.asYears())} years ago`;
    } else if (duration.asMonths() >= 1) {
      return `${Math.round(duration.asMonths())} months ago`;
    } else if (duration.asDays() >= 1) {
      return `${Math.round(duration.asDays())} days ago`;
    } else if (duration.asHours() >= 1) {
      return `${Math.round(duration.asHours())} hours ago`;
    } else if (duration.asMinutes() >= 1) {
      return `${Math.round(duration.asMinutes())} minutes ago`;
    } else {
      return `${Math.round(duration.asSeconds())} seconds ago`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
          <BackButton />
        </TouchableOpacity>
        <Text style={styles.nameText}>{friend.friendName.split(" ")[0]}</Text>
      </View>
      <ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.edit}
            onPress={() =>
              navigation.navigate("AttendanceHistory", { friend: friend })
            }>
            <Text style={styles.editText}>View Attendance</Text>
          </TouchableOpacity>
          {showNewReport && (
            <TouchableOpacity
              style={styles.edit}
              onPress={() =>
                navigation.navigate("NewFriendReport", { friend: friend })
              }>
              <Text style={styles.editText}>Write New Report</Text>
            </TouchableOpacity>
          )}
        </View>
        {reports.map((report) => (
          <Post
            key={report._id}
            profilePic={friend.profilePic}
            profileName={friend.friendName.split(" ")[0]}
            profileLocation="Report"
            profileTimePosted={calculateTimeSincePost(report.date)}
            bodyText={report.reportBody}
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
