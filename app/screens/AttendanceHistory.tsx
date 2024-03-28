import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import BackButton from "../components/BackButton";
import { NavigationProp } from "@react-navigation/native";
import { API_URL, API_SECRET } from "@env";
import { generateHmacSignature } from "../utils/signature";
import { RouteProp } from "@react-navigation/native";

interface RouterProps {
  route: RouteProp<{ params: { friend: any } }>;
  navigation: NavigationProp<any, any>;
  recipient: String;
}

const AttendanceHistory = ({ route, navigation }: RouterProps) => {
  const navigateDay = (day: DateData) => {
    if (friend === "all") {
      navigation.navigate("DayAttendance", {
        date: day.dateString,
      });
    } else {
      navigation.navigate("DayAttendanceUser", {
        params: { date: day.dateString, friendId: friend._id },
      });
    }
  };
  const { friend } = route.params;
  return (
    <View>
      <Calendar
        theme={{ calendarBackground: "white", backgroundColor: "#A5DAE2" }}
        onDayPress={navigateDay}
      />
    </View>
  );
};

export default AttendanceHistory;
