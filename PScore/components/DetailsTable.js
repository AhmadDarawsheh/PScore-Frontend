import { View, Text } from "react-native";
import React from "react";
import Marker from "./GameDetailsComponents/Marker";
import colors from "../assets/colors/colors";

const DetailsTable = ({ children, header }) => {
  const renderedSections = React.Children.toArray(children).map(
    (child, index) => (
      <View key={index} className="border-b border-r border-l border-slate-500">
        {child}
      </View>
    )
  );

  return (
    <View
      className="bg-slate-500 mx-2 rounded-md"
      style={{ backgroundColor: colors.mainColor }}
    >
      <Marker classes={""} color="white">
        {header}
      </Marker>
      <View className="flex items-center">
        <View className="bg-slate-200 w-full">{renderedSections}</View>
      </View>
    </View>
  );
};

export default DetailsTable;
