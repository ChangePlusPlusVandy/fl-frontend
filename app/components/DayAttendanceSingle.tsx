import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import friendPFP from "../../assets/friendImage.png";
import { formatTimeToAMPM } from "../utils/timezone";

interface AttendanceData {
  timeIn: string[];
  timeOut: string[];
  friendName?: string;
  profilePicture: any;
}

const AttendanceSingle = ({
  friendName,
  timeIn,
  timeOut,
  profilePicture,
}: AttendanceData) => {
  const [T, setT] = useState(false);
  const toggleT = () => setT((previousState) => !previousState);

  const [S, setS] = useState(false);
  const toggleS = () => setS((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: profilePicture
              ? profilePicture
              : "https://res.cloudinary.com/dvrcdxqex/image/upload/v1707870630/defaultProfilePic.png",
          }}
          style={{ width: 80, height: 80 }}
        ></Image>
      </View>

      <View>
        <Text style={styles.name}>{friendName}</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={styles.superContainer}>
            <View
              style={
                timeIn.length >= timeOut.length && timeIn.length != 0
                  ? styles.buttonContainerGreen
                  : styles.buttonContainerRed
              }
            >
              <Text style={styles.buttonText}>
                {timeIn.length >= timeOut.length && timeIn.length != 0
                  ? "Present"
                  : "Absent"}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 8 }}>
            <View style={styles.timeHeaderContainer}>
              <Text style={styles.timeHeader}>Time in</Text>
              <Text style={styles.timeHeader}>Time out</Text>
            </View>
            {timeIn.map((item, index) => (
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                  {formatTimeToAMPM(timeIn[index])}
                </Text>
                <Text style={styles.timeText}>
                  {formatTimeToAMPM(timeOut[index])}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "800",
  },
  container: {
    backgroundColor: "rgba(217, 217, 217, 0.39)",
    flexDirection: "row",
    gap: 5,
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  switchContainer: {
    flexDirection: "row",
    gap: 20,
  },
  switch: {
    flexDirection: "row",
    paddingHorizontal: 5,
    gap: 5,
    alignItems: "center",
    marginTop: 5,
  },
  switchText: {
    fontWeight: "500",
    fontSize: 17,
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
    borderColor: "#E1E9F1",
    borderWidth: 3,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  superContainer: {
    justifyContent: "center",
  },
  buttonContainerRed: {
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#EC88AA",
    justifyContent: "center",
    paddingHorizontal: 1,
  },
  buttonContainerGreen: {
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#A3CFB2",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,

    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  timeHeader: {
    fontWeight: "500",
    fontSize: 16,
  },
  timeText: {
    fontSize: 16,
  },
  timeHeaderContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 6,
    justifyContent: "center",
    marginTop: 5,
  },
  timeContainer: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "space-between",
    marginHorizontal: 7,
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    width: "100%",
    marginVertical: 4,
  },
});

export default AttendanceSingle;
