import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import players from "../../assets/Data/Players";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../assets/colors/colors";
const { width } = Dimensions.get("window");
const TopPlayers = () => {
  return (
    <>
      <Text>Top Players Asissts</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ paddingBottom: 10 }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={340}
        // onScroll={(event) => {
        //   console.log(event.nativeEvent.contentOffset.x);
        // }}
        data={players}
        renderItem={({ item, index }) => (
          <ItemPlayer item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const ItemPlayer = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={[colors.myWhite, colors.myWhite, colors.secondColor]}
      className="w-[150px] h-[200px] mt-4 bg-white mx-[10px] flex items-center justify-center rounded-md"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PlayerDetails", { name: item.name })
        }
        className="flex items-center justify-center"
      >
        <View className="border-2 border-green-500 w-[100px] h-[100px] rounded-full">
          <Image
            source={item.imageUrl}
            style={{ resizeMode: "stretch" }}
            className="w-full h-full rounded-full"
          />
        </View>
        <Text className="text-green-800">{item.name}</Text>
        <Text className="text-green-600 mb-1">{item.city}</Text>
        <View
          className="p-1 border border-green-400 bg-green-700"
          // style={{ backgroundColor: "#131313" }}
        >
          <Text style={{ fontSize: 12 }} className="text-white">
            9Goals 180Min 3Games
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};
export default TopPlayers;
