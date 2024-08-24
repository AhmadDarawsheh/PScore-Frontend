import { View, Text } from "react-native";
import React from "react";
import colors from "../../assets/colors/colors";
const Marker = ({ children, color, classes }) => {
  return (
    <Text
      className={`font-bold pl-4 my-2 text-lg ${classes}`}
      style={{ color: color ? color : colors.mainColor }}
    >
      {children}
    </Text>
  );
};

export default Marker;
