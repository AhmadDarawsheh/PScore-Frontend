import React from "react";
import { View, Button, Alert } from "react-native";

const MyAlert = () => {
  const showAlert = () => {
    Alert.alert(
      "Alert Title",
      "This is the message",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Alert" onPress={showAlert} />
    </View>
  );
};

export default MyAlert;
