import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import searchIcon from "../../assets/search.png";
import AttendanceSingle from "../components/AttendanceSingle";
import { NavigationProp } from "@react-navigation/native";
import DayAttendanceSingle from "../components/DayAttendanceSingle";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const DayAttendance = ({ navigation }: RouterProps) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Image source={searchIcon} style={{ width: 30, height: 30 }}></Image>
          <TextInput
            placeholder="Search"
            onChangeText={(newValue) => setSearchValue(newValue)}
            defaultValue={searchValue}
            style={styles.searchInput}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.history}
          onPress={() => navigation.navigate("AttendanceHistory")}
        >
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.attendanceContainer}>
        <DayAttendanceSingle />
        <DayAttendanceSingle />
        <DayAttendanceSingle />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    backgroundColor: "rgba(204, 204, 204, 0.33)",
    borderRadius: 50,
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 8,
    flex: 1,
  },
  searchInput: {
    height: 25,
    fontSize: 18,
    fontWeight: "600",
    width: "100%",
  },
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  history: {
    backgroundColor: "#F89B40",
    paddingTop: 10,
    paddingHorizontal: 25,
    borderRadius: 100,
  },
  historyText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  topBar: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  attendanceContainer: {
    padding: 10,
  },
});

export default DayAttendance;
