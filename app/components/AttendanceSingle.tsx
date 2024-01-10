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
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText}>Arrived</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
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
});

export default AttendanceSingle;
