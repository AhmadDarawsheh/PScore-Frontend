import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import colors from "../../assets/colors/colors";

const SlidesPicker = ({ Slides, children }) => {
  const firstChildDisplayName =
    React.Children.toArray(children)[0]?.props?.dispalyName;
  const [page, setPage] = useState(firstChildDisplayName);

  const renderComponent = () => {
    {
      return React.Children.map(children, (child) =>
        page == child?.props?.dispalyName ? child : null
      );
    }
  };

  return (
    <>
      <View className="w-full flex items-center justify-center mt-2">
        <View
          style={{ backgroundColor: colors.secondColor }}
          className=" flex-row  rounded-lg"
        >
          {React.Children.map(
            children,
            (child, index) =>
              child != null && (
                <Slide
                  key={index}
                  name={child.props.dispalyName}
                  dispalyName={child.props.dispalyName}
                  page={page}
                  setPage={setPage}
                />
              )
          )}
        </View>
      </View>
      {renderComponent()}
    </>
  );
};
const Slide = ({ name, dispalyName, page, setPage }) => {
  const activeStyle =
    page == name ? "bg-slate-100 border border-emerald-950" : "";
  return (
    <Pressable
      onPress={() => {
        setPage(name);
      }}
      className={"flex items-center w-[120px] py-2 rounded-lg " + activeStyle}
    >
      <Text>{dispalyName}</Text>
    </Pressable>
  );
};
export default SlidesPicker;
