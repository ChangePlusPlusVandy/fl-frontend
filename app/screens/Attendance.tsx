import React, { useEffect, useState } from "react";
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
import { generateHmacSignature } from "../utils/signature";
import { API_URL, API_SECRET } from "@env";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface FriendData {
  friendName: string;
  friendId: string;
  attendance: [string];
}

const Attendance = ({ navigation }: RouterProps) => {
  const [friends, setFriends] = useState<FriendData[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<FriendData[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const getFriends = async () => {
    try {
      const signature = generateHmacSignature("GET", API_SECRET);

      const response = await fetch(`${API_URL}/friend`, {
        method: "GET",
        headers: {
          "Friends-Life-Signature": signature,
        },
      });
      const res = await response.json();

      const extractedFriends: FriendData[] = res.map((friend: any) => ({
        friendName: friend.friendName,
        friendId: friend._id,
        attendance: friend.attendance,
      }));

      setFriends(extractedFriends);
      setFilteredFriends(extractedFriends);
    } catch (error) {
      console.error("Error");
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);

    const filteredDisplay = friends
      .filter((item) => {
        const friendName = item.friendName.toLowerCase() || "";
        return friendName.includes(value.toLowerCase());
      })
      .map(({ friendId, attendance, friendName }) => ({
        friendId,
        attendance,
        friendName,
      }));

    setFilteredFriends(filteredDisplay);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Image source={searchIcon} style={{ width: 30, height: 30 }}></Image>
          <TextInput
            placeholder="Search"
            onChangeText={handleSearch}
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
        {filteredFriends.map((friend) => (
          <AttendanceSingle
            key={friend.friendId}
            friendId={friend.friendId}
            friendName={friend.friendName}
            attendanceIds={friend.attendance}
          />
        ))}
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

export default Attendance;
