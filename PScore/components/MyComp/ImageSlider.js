import { View, Text, FlatList, Image, Animated } from "react-native";
import React, { useRef } from "react";
import stadiums from "../../assets/Data/Stadiums";

const ImageSlider = () => {
  const DATA = stadiums;
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View className="flex items-center justify-center">
      <Animated.FlatList
        className="w-[300px]"
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={DATA}
        snapToAlignment="center"
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <View className="w-[300px] h-[300px] bg-slate-100">
            <Image source={item.imageUrl} className="w-[300px] h-[300px]" />
          </View>
        )}
        // onScroll={e=>console.log(e.nativeEvent.contentOffset.x)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.id}
      />
      <View className="mt-6 flex-row space-x-1">
        {DATA.map((item, index) => {
          const StepPos = Animated.divide(scrollX, 300);
          const opacity = 0;

          return (
            <View
              key={index}
              style={{
                padding: 5,
                backgroundColor: "gray",
                borderRadius: 50,
                opacity: opacity,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};
const Item = () => (
  <View>
    <Text>{item.name}</Text>
  </View>
);
export default ImageSlider;
