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

const AttendanceSingle = () => {
  const [T, setT] = useState(false);
  const toggleT = () => setT((previousState) => !previousState);

  const [S, setS] = useState(false);
  const toggleS = () => setS((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={friendPFP} style={{ width: 60, height: 60 }}></Image>
      </View>

      <View>
        <Text style={styles.name}>Neel Gundavarapu</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Present</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.timeHeaderContainer}>
              <Text style={styles.timeHeader}>Time in</Text>
              <Text style={styles.timeHeader}>Time out</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>0:00</Text>
              <Text style={styles.timeText}>0:00</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>0:00</Text>
              <Text style={styles.timeText}>0:00</Text>
            </View>
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
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#EC88AA",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
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
  },
  timeContainer: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    width: "100%",
    marginVertical: 4,
  },
});

export default AttendanceSingle;
