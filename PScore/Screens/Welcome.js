import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import PageTest from "./PageTest.js";
import { LinearGradient } from "expo-linear-gradient";
const colors = require("../assets/colors/colors.js");
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOut,
} from "react-native-reanimated";
import FootballAnimated from "../components/FootballAnimated.js";
const Welcome = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center relative">
      <Image
        className="w-full h-full"
        style={{ resizeMode: "stretch" }}
        source={require("../assets/images/soccerBG.jpg")}
      />
      <LinearGradient
        className="w-full h-full absolute"
        style={{ resizeMode: "stretch" }}
        colors={["transparent", "rgba(0,0,0,0.8)"]}
      />
      <View className="absolute flex items-center justify-center h-full w-full">
        <View className="mb-16 flex items-center">
          <Animated.View entering={FadeInLeft.duration(5000)} className="mb-10">
            <Text
              className="text-white text-6xl"
              style={{ color: colors.secondColor }}
            >
              <Text style={{ color: colors.mainColor }}>PS</Text>core
            </Text>
          </Animated.View>

          <View>
            <FootballAnimated />
          </View>
        </View>
      </View>
      <View className="absolute flex items-center justify-end h-full w-full ">
        <Animated.View entering={FadeInLeft.duration(2000)}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="px-12 py-5 rounded-xl mb-40"
            style={{ backgroundColor: "#333333" }}
          >
            <Text className="text-xl" style={{ color: colors.secondColor }}>
              Start Your Journey
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default Welcome;
