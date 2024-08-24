import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Player = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PlayerDetails", {
          _id: item._id || item.user,
          item,
        })
      }
      className="flex-row mt-2"
    >
      <Image
        className="rounded-full"
        style={{ width: 50, height: 50, resizeMode: "stretch" }}
        source={
          item?.image
            ? { uri: item.image }
            : require("../assets/images/defaultUserImage.jpg")
        }
      />
      <View style={{ width: 250 }}>
        <Text>{item?.userName}</Text>
        <Text>{item?.position}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Player;
