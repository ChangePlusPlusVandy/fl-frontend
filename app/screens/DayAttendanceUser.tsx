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
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import DayAttendanceSingle from "../components/DayAttendanceSingle";
import { API_SECRET, API_URL } from "@env";
import { generateHmacSignature } from "../utils/signature";
import useAuthStore from "../stores/auth";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

type DayScreenRouteProp = {
  Params: { params: { date: string; friendId: string } };
};

interface AttendanceItem {
  __v: number;
  _id: string;
  createdAt: string;
  date: string;
  friendId: string;
  timeIns: string[];
  timeOuts: string[];
  updatedAt: string;
}

interface AttendanceData {
  friendId: string;
  timeIns: string[];
  timeOuts: string[];
  friendName: string;
  profilePicture: any;
}

const DayAttendance = ({ navigation }: RouterProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [display, setDisplay] = useState<AttendanceData[]>([]);
  const [filteredDisplay, setFilteredDisplay] = useState<AttendanceData[]>([]);
  const route = useRoute<RouteProp<DayScreenRouteProp, "Params">>();
  const { params } = route.params;
  const { checkApproved } = useAuthStore();

  useEffect(() => {
    checkApproved();
    let tempAttendance: AttendanceItem[] = [];

    const getAttendance = async () => {
      try {
        const filterObject = { date: params.date };
        const filterString = JSON.stringify(filterObject);
        const encodedFilterString = encodeURIComponent(filterString);

        const signature = generateHmacSignature(
          JSON.stringify({ filter: `{"date":"${params.date}"}` }),
          API_SECRET
        );

        const response = await fetch(
          `${API_URL}attendance?filter=${encodedFilterString}`,
          {
            method: "GET",
            headers: {
              "Friends-Life-Signature": signature,
            },
          }
        );
        const res = await response.json();
        tempAttendance = res;
        fetchData();
      } catch (error) {
        console.log(error);
      }
    };
    getAttendance();

    const getFriendById = async (friendId: string) => {
      try {
        const signature = generateHmacSignature(
          JSON.stringify({ friendId: friendId }),
          API_SECRET
        );

        const response = await fetch(`${API_URL}friend/${friendId}`, {
          method: "GET",
          headers: {
            "Friends-Life-Signature": signature,
          },
        });

        const res = await response.json();
        return res;
      } catch (error) {
        console.error("Error fetching friend:", error);
        return null;
      }
    };

    const fetchData = async () => {
      const newData: AttendanceData[] = [];

      tempAttendance
        .filter((obj) => obj.friendId === params.friendId)
        .map(async (obj) => {
          const { friendId, timeIns, timeOuts } = obj;
          try {
            const friend = await getFriendById(friendId);

            if (friend && friend.friendName) {
              newData.push({
                friendId,
                timeIns,
                timeOuts,
                friendName: friend.friendName,
                profilePicture: friend.profilePicture,
              });
              setDisplay(newData);
              setFilteredDisplay(newData);
            } else {
              console.log(`Friend information not found for ${friendId}`);
            }
          } catch (error) {
            console.error("Error fetching friend:", error);
          }
        });
    };
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);

    const filteredDisplay = display
      .filter((item) => {
        const friendName = item.friendName.toLowerCase() || "";
        return friendName.includes(value.toLowerCase());
      })
      .map(({ friendId, timeIns, timeOuts, friendName, profilePicture }) => ({
        friendId,
        timeIns,
        timeOuts,
        friendName,
        profilePicture,
      }));

    setFilteredDisplay(filteredDisplay);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Image source={searchIcon} style={{ width: 30, height: 30 }}></Image>
          <TextInput
            placeholder="Search"
            onChangeText={handleSearch}
            defaultValue={searchValue}
            style={styles.searchInput}></TextInput>
        </View>
        <TouchableOpacity
          style={styles.history}
          onPress={() => navigation.navigate("AttendanceHistory")}>
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.attendanceContainer}>
        {filteredDisplay.map((item) => (
          <DayAttendanceSingle
            key={item.friendId}
            friendName={item.friendName}
            timeIn={item.timeIns}
            timeOut={item.timeOuts}
            profilePicture={item.profilePicture}
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

export default DayAttendance;
