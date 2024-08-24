import { View, Text, Pressable } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
const Header = ({ setModalVisible }) => {
  return (
    <View
      className="w-full flex-row justify-between items-center px-4 pt-8 pb-2"
      style={{ backgroundColor: colors.secondColor }}
    >
      <Pressable onPress={() => setModalVisible(true)}>
        <Text className="text-2xl">PScore</Text>
      </Pressable>
      <MagnifyingGlassIcon color={"black"} />
    </View>
  );
};

export default Header;
