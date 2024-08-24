import { View, Text, Dimensions, ScrollView } from "react-native";
import React from "react";
import StadiumsExplore from "../components/ExplorePageComponents/StadiumsExplore";
import TopPlayers from "../components/ExplorePageComponents/TopPlayers";
const { width } = Dimensions.get("window");
const card_width = width * 0.8;
const spacing = width * 0.02;

const side_card = (width * 0.18) / 2;
const Explore = () => {
  return (
    <View>
      <StadiumsExplore />
      {/* <TopPlayers /> */}
    </View>
  );
};

// const Item = ({ item, index }) => {
//   return (
//     <View
//       className="bg-slate-50 rounded-lg h-[180px] mt-4 relative "
//       style={{ elevation: 6, width: width * 0.8 - 20, marginHorizontal: 10 }}
//     >
//       <Image
//         className="w-full h-full rounded-lg"
//         source={item.imageUrl}
//         style={{ resizeMode: "stretch" }}
//       />
//       <LinearGradient
//         className="w-full h-full absolute rounded-lg"
//         start={{ x: 0, y: 0.4 }} // Start from the top
//         end={{ x: 0, y: 1 }} // End at the bottom
//         colors={["transparent", "rgba(0,0,0,0.8)"]}
//       />
//       <View className="absolute bottom-0 translate-x-5 mb-5">
//         <Text className="text-white ">{item.name}</Text>
//         <Text className="text-white text-xs font-light">{item.city}</Text>
//       </View>
//     </View>
//   );
// };

export default Explore;
