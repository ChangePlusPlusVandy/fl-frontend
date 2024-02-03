import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import BackButton from "../components/BackButton";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
  recipient: String;
}

const AttendanceHistory = ({ navigation }: RouterProps) => {
  return (
    <View>
      <Calendar
        theme={{ calendarBackground: "white", backgroundColor: "#A5DAE2" }}
        onDayPress={() => navigation.navigate("DayAttendance")}
      />
    </View>
  );
};

export default AttendanceHistory;
