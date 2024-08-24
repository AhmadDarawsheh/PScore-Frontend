import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Info from "../Info";
import DetailsTable from "../DetailsTable";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const LineUP = ({ players, others }) => {
  useEffect(() => {
    console.log(players);
    console.log(others);
  }, []);

  return (
    <View className="w-full flex items-center justify-center mt-4 relative">
      <View
        style={{
          width: wp(130),
          height: hp(50),
          maxWidth: 900,
        }}
      >
        <Image
          source={require("../../assets/images/footballground.png")}
          style={{ resizeMode: "stretch", width: "100%", height: "100%" }}
        />
        {/*striker */}

        {players && (
          <>
            <Player
              top={"20%"}
              left={"50%"}
              ImageProp={
                players[0]?.photo
                  ? { uri: players[0]?.photo }
                  : require("../../assets/images/defaultUserImage.jpg")
              }
              Name={players[0]?.name}
              goals={players[0]?.goals}
              assists={players[0]?.assists}
              item={players[0]}
            />
            <Player
              top={"50%"}
              left={"50%"}
              ImageProp={
                players[1]?.photo
                  ? { uri: players[1]?.photo }
                  : require("../../assets/images/defaultUserImage.jpg")
              }
              Name={players[1]?.name}
              goals={players[1]?.goals}
              assists={players[1]?.assists}
              item={players[1]}
            />
            <Player
              top={"70%"}
              left={"35%"}
              ImageProp={
                players[2]?.photo
                  ? { uri: players[2]?.photo }
                  : require("../../assets/images/defaultUserImage.jpg")
              }
              Name={players[2]?.name}
              goals={players[2]?.goals}
              assists={players[2]?.assists}
              item={players[2]}
            />
            <Player
              top={"70%"}
              left={"65%"}
              ImageProp={
                players[3]?.photo
                  ? { uri: players[3]?.photo }
                  : require("../../assets/images/defaultUserImage.jpg")
              }
              Name={players[3]?.name}
              goals={players[3]?.goals}
              assists={players[3]?.assists}
              item={players[3]}
            />

            <Player
              top={"90%"}
              left={"50%"}
              ImageProp={
                players[4]?.photo
                  ? { uri: players[4]?.photo }
                  : require("../../assets/images/defaultUserImage.jpg")
              }
              Name={players[4]?.name}
              goals={players[4]?.goals}
              assists={players[4]?.assists}
              item={players[4]}
            />
          </>
        )}

        {/* <Player
          top={"50%"}
          left={"50%"}
          ImageProp={
            players[1].photo
              ? { uri: players[1].photo }
              : require("../../assets/images/defaultUserImage.jpg")
          }
          Name={players[1].name}
        />
        <Player
          top={"70%"}
          left={"35%"}
          ImageProp={
            players[2].photo
              ? { uri: players[1].photo }
              : require("../../assets/images/defaultUserImage.jpg")
          }
          Name={players[1].name}
        />
        <Player
          top={"90%"}
          left={"50%"}
          ImageProp={require("../../assets/images/defaultUserImage.jpg")}
          Name={"GoalK"}
        />
        <Player top={"70%"} left={"65%"} Name={"Def"} /> */}
      </View>
      {others?.length > 0 && <OtherPlayers others={others} />}
    </View>
  );
};
const OtherPlayers = ({ others }) => {
  return (
    <View className="mt-2 w-[300px]">
      <DetailsTable header={"bench"}>
        {others.map((item) => (
          <Info key={item._id} item={item} first={item.name} />
        ))}
      </DetailsTable>
    </View>
  );
};
const Player = ({ top, left, ImageProp, goals, assists, Name, item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="absolute flex items-center justify-center"
      onPress={() => {
        navigation.navigate("PlayerDetails", {
          _id: item.playerId,
          item,
        });
      }}
      style={{
        width: 100,
        height: 100,
        top: top,
        left: left,
        transform: [{ translateX: -50 }, { translateY: -50 }],
      }}
    >
      {/*goals*/}
      <View
        className="absolute flex items-start justify-start  w-10  z-10"
        style={{ transform: [{ translateX: 30 }, { translateY: -35 }] }}
      >
        {goals > 0 && (
          <View className="flex-row bg-white/60 rounded-full px-1 space-x-[3px] border border-[#18453B]">
            {Array(goals < 3 ? goals : 3)
              .fill()
              .map((_, index) => (
                <Image
                  key={index}
                  className="rounded-full"
                  source={require("../../assets/images/footballcartoon.jpg")}
                  style={{ width: 20, height: 20 }}
                />
              ))}
            <Text className="px-1 h-5">{goals < 3 ? goals : `(${goals})`}</Text>
          </View>
        )}
      </View>

      {/*assets*/}

      <View
        className="absolute flex items-start justify-start  w-10  z-10"
        style={{ transform: [{ translateX: 30 }, { translateY: 10 }] }}
      >
        {assists > 0 && (
          <View className="flex-row bg-white/60 rounded-full px-1 space-x-[3px] border border-[#18453B]">
            {Array(assists < 3 ? assists : 3)
              .fill()
              .map((_, index) => (
                <Image
                  key={index}
                  className=""
                  source={require("../../assets/images/assists.png")}
                  style={{ width: 20, height: 20 }}
                />
              ))}
            <Text className="px-1 h-5">
              {assists < 3 ? assists : `(${assists})`}
            </Text>
          </View>
        )}
      </View>

      <View className="border border-emerald-400 rounded-full">
        <Image
          className="rounded-full "
          source={ImageProp}
          style={{ resizeMode: "stretch", width: 50, height: 50 }}
        />
      </View>

      <Text className="text-white">{Name}</Text>
    </TouchableOpacity>
  );
};
export default LineUP;
