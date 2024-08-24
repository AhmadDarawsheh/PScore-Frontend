import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import stadiumsData from "../../assets/Data/Stadiums";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const { width } = Dimensions.get("window");
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const StadiumsExplore = () => {
  const { playgrounds } = useAuth();

  return (
    <View className="items-center">
      <FlatList
        // onScroll={(event) => {
        //   setScrollX(event.nativeEvent.contentOffset.x);
        // }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        data={playgrounds}
        renderItem={({ item, index }) => <Item item={item} key={index} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};
const Item = ({ item }) => {
  const navigation = useNavigation();
  const isWeb = Platform.OS === "web";

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Stadium", { ...item })}
      className="bg-slate-50 rounded-lg h-[180px] mt-4 relative "
      style={{
        elevation: 6,
        width: isWeb ? 300 : wp(80),
        marginHorizontal: 10,
      }}
    >
      <Image
        className="w-full h-full rounded-lg"
        source={
          item.photos[0]
            ? { uri: item.photos[0] }
            : require("../../assets/images/stadiums/etihad.jpg")
        }
        style={{ resizeMode: "stretch" }}
      />
      <LinearGradient
        className="w-full h-full absolute rounded-lg"
        start={{ x: 0, y: 0.4 }} // Start from the top
        end={{ x: 0, y: 1 }} // End at the bottom
        colors={["transparent", "rgba(0,0,0,0.8)"]}
      />
      <View className="absolute bottom-0 translate-x-5 mb-5">
        <Text className="text-white ">{item.name}</Text>
        <Text className="text-white text-xs font-light">Nablus</Text>
      </View>
    </TouchableOpacity>
  );
};
export default StadiumsExplore;
