import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HandThumbUpIcon } from "react-native-heroicons/outline";
import {
  ShareIcon,
  HandThumbUpIcon as HandThumbUpIconSolid,
} from "react-native-heroicons/solid";
import colors from "../assets/colors/colors";
const { width, height } = Dimensions.get("window");
const NewsCard = ({ item }) => {
  return (
    <View key={item._id}>
      {width > 720 ? <WebCard item={item} /> : <MobileCard item={item} />}
    </View>
  );
};
const MobileCard = ({ item }) => {
  const [activeLike, setActiveLike] = useState(false);
  let isActive = activeLike == true;
  return (
    <View
      key={item._id}
      style={{ backgroundColor: colors.secondColor }}
      className=" rounded-3xl flex items-center mt-4 mx-4"
    >
      <Text className="font-bold">{item.title}</Text>
      <Text>{item.desc}</Text>

      <Text style={{ color: colors.mainColor }}>{item.date}</Text>
      <Image
        style={{ height: hp(30) }}
        className="w-full"
        source={
          item.image
            ? { uri: item.image }
            : require("../assets/images/haaland.jpg")
        }
      />
      <View className="flex-row justify-between w-full px-6 py-2">
        <TouchableOpacity
          onPress={() => {
            setActiveLike(!activeLike);
          }}
        >
          {isActive ? (
            <HandThumbUpIconSolid color={"black"} />
          ) : (
            <HandThumbUpIcon color={"black"} />
          )}
        </TouchableOpacity>

        <ShareIcon color={"black"} />
      </View>
    </View>
  );
};
const WebCard = ({ item }) => {
  const [activeLike, setActiveLike] = useState(false);
  let isActive = activeLike == true;
  return (
    <View
      style={{ backgroundColor: colors.secondColor }}
      className="rounded-3xl flex-row items-start justify-start mt-4 mx-4 px-3 space-x-3 relative"
    >
      <Image
        style={{ height: hp(30), width: wp(30) }}
        className="ml-3"
        source={
          item.image
            ? { uri: item.image }
            : require("../assets/images/haaland.jpg")
        }
      />
      <View className="flex h-full items-start justify-center">
        <Text className="font-bold">{item.title}</Text>
        <Text>{item.desc}</Text>
        <Text>{item.date}</Text>
        <View
          className="flex-row justify-between items-end w-full px-6 py-2  absolute bottom-0 -z-20"
          style={{ height: 100, width: 400 }}
        >
          <TouchableOpacity
            onPress={() => {
              setActiveLike(!activeLike);
            }}
          >
            {isActive ? (
              <HandThumbUpIconSolid color={"black"} />
            ) : (
              <HandThumbUpIcon color={"black"} />
            )}
          </TouchableOpacity>

          <ShareIcon color={"black"} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default NewsCard;
