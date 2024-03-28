import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import friendPFP from "../../assets/friendImage.png";
import { generateHmacSignature } from "../utils/signature";
import { API_SECRET, API_URL } from "@env";
import { convertToCentral } from "../utils/timezone";

interface FriendData {
  friendName: string;
  friendId: string;
  attendanceIds: [string];
  profilePicture: any;
}

interface AttendanceData {
  date: Date;
  friendId: string;
  timeIns: Date[];
  timeOuts: Date[];
  transportation: boolean;
  socialClub: boolean;
}

const AttendanceSingle = ({
  friendName,
  friendId,
  attendanceIds,
  profilePicture,
}: FriendData) => {
  const [T, setT] = useState(false);
  const toggleT = () => setT((previousState) => !previousState);

  const [S, setS] = useState(false);
  const toggleS = () => setS((previousState) => !previousState);

  const [attendanceId, setAttendanceId] = useState("");
  const [created, setCreated] = useState(false);
  const [arrived, setArrived] = useState(false);

  const [timeIns, setTimeIns] = useState<Date[]>([]);
  const [timeOuts, setTimeOuts] = useState<Date[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArrived = async () => {
      setLoading(true);

      try {
        if (attendanceIds && attendanceIds.length > 0) {
          const latestAttendance = attendanceIds[attendanceIds.length - 1];

          const signature = generateHmacSignature(
            JSON.stringify({ attendanceId: latestAttendance }),
            API_SECRET
          );

          const response = await fetch(
            `${API_URL}attendance/${latestAttendance}`,
            {
              method: "GET",
              headers: {
                "Friends-Life-Signature": signature,
              },
            }
          );
          const res = await response.json();

          let today = new Date();
          today = convertToCentral(today);
          const latestAttendanceDate = new Date(res?.date);

          const year1 = latestAttendanceDate?.getFullYear();
          const month1 = latestAttendanceDate?.getMonth();
          const day1 = latestAttendanceDate?.getDate();

          const year2 = today.getFullYear();
          const month2 = today.getMonth();
          const day2 = today.getDate();

          if (year1 === year2 && month1 === month2 && day1 === day2) {
            setCreated(true);
            setAttendanceId(latestAttendance);
            setTimeIns(res.timeIns);
            setTimeOuts(res.timeOuts);
            if (res.timeIns.length > res.timeOuts.length) {
              setArrived(true);
            }
          }
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      setLoading(false);
    };
    getArrived();
  }, []);

  const handleArrived = async () => {
    setLoading(true);
    if (!created) {
      try {
        let today = new Date();
        today = convertToCentral(today);

        const attendanceData: AttendanceData = {
          date: today,
          friendId: friendId,
          timeIns: [today],
          timeOuts: [],
          transportation: T,
          socialClub: S,
        };

        const signature = generateHmacSignature(
          JSON.stringify(attendanceData),
          API_SECRET
        );

        const response = await fetch(`${API_URL}attendance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Friends-Life-Signature": signature,
          },
          body: JSON.stringify(attendanceData),
        });
        const res = await response.json();

        let updatedAttendances = attendanceIds;
        if (updatedAttendances) {
          updatedAttendances.push(res._id);
        } else {
          updatedAttendances = [res._id];
        }

        setAttendanceId(res._id);
        setTimeIns(res.timeIns);

        const signature2 = generateHmacSignature(
          JSON.stringify({ attendance: updatedAttendances }),
          API_SECRET
        );

        await fetch(`${API_URL}friend/${friendId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Friends-Life-Signature": signature2,
          },
          body: JSON.stringify({ attendance: updatedAttendances }),
        });

        setArrived(!arrived);
        setCreated(true);
        setAttendanceId(res._id);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    } else {
      try {
        let today = new Date();
        today = convertToCentral(today);

        const signature = generateHmacSignature(
          JSON.stringify({ timeIns: [...timeIns, today] }),
          API_SECRET
        );

        await fetch(`${API_URL}attendance/${attendanceId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Friends-Life-Signature": signature,
          },
          body: JSON.stringify({ timeIns: [...timeIns, today] }),
        });

        timeIns.push(today);
        setArrived(!arrived);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleDeparted = async () => {
    setLoading(true);
    try {
      let today = new Date();
      today = convertToCentral(today);

      const signature = generateHmacSignature(
        JSON.stringify({ timeOuts: [...timeOuts, today] }),
        API_SECRET
      );

      const response = await fetch(`${API_URL}attendance/${attendanceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Friends-Life-Signature": signature,
        },
        body: JSON.stringify({ timeOuts: [...timeOuts, today] }),
      });

      timeOuts.push(today);
      setArrived(!arrived);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };

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
        <View style={styles.switchContainer}>
          <View style={styles.switch}>
            <Text style={styles.switchText}>T</Text>
            <Switch
              trackColor={{ false: "#D9D9D9", true: "#333B52" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#D9D9D9"
              onValueChange={toggleT}
              value={T}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
          <View style={styles.switch}>
            <Text style={styles.switchText}>S</Text>
            <Switch
              trackColor={{ false: "#D9D9D9", true: "#333B52" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#D9D9D9"
              onValueChange={toggleS}
              value={S}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={loading || arrived ? styles.button1disabled : styles.button1}
            onPress={handleArrived}
            disabled={loading || arrived}
          >
            <Text style={styles.buttonText}>Arrived</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              loading || !arrived ? styles.button2disabled : styles.button2
            }
            onPress={handleDeparted}
            disabled={loading || !arrived}
          >
            <Text style={styles.buttonText}>Departed</Text>
          </TouchableOpacity>
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
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  button1: {
    backgroundColor: "#A3CFB2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  button1disabled: {
    backgroundColor: "#A3CFB2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    opacity: 0.3,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  button2: {
    backgroundColor: "#A0D4E4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  button2disabled: {
    backgroundColor: "#A0D4E4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    opacity: 0.3,
  },
});

export default AttendanceSingle;
