import { View, Text, Image } from "react-native";
import React from "react";

const Info = ({ item, first, position }) => {
  return (
    <View className="flex-row  items-center py-3 ml-2">
      <View className="rounded-full border border-green-700">
        <Image
          className="rounded-full"
          source={
            item?.image || item?.photo
              ? { uri: item.image || item.photo }
              : require("../assets/images/defaultUserImage.jpg")
          }
          style={{ width: 40, height: 40 }}
        />
      </View>

      <View className="ml-1">
        <Text>{first}</Text>
        <Text>{position}</Text>
      </View>
    </View>
  );
};

export default Info;
