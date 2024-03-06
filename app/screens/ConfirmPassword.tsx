import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const ConfirmPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPassword = () => {
    if (password === confirmPassword) {
    } else {
    }
  };

  return (
    <View>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Confirm Password" onPress={handleConfirmPassword} />
    </View>
  );
};
const styles = StyleSheet.create({});
export default ConfirmPassword;
