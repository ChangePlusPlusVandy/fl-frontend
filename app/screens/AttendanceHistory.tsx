import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import BackButton from "../components/BackButton";
import { NavigationProp } from "@react-navigation/native";
import { API_URL, API_SECRET } from "@env";
import { generateHmacSignature } from "../utils/signature";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const AttendanceHistory = ({ navigation }: RouterProps) => {
  const navigateDay = (day: DateData) => {
    navigation.navigate("DayAttendance", { date: day.dateString });
  };
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
