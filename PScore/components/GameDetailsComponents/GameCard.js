import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import colors from "../../assets/colors/colors";
import { ChevronLeftIcon, BellAlertIcon } from "react-native-heroicons/solid";
import { BellIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import SearchTeam from "../SearchTeam";
{
  /*const GameCard = () => {
  navigation = useNavigation();
  const [activeBell, setActiveBell] = useState(false);
  return (
    <View
      style={{ width: wp(100), height: hp(30) }}
      className="relative bg-slate-500"
    >
      <Image
        style={{
          resizeMode: "stretch",
        }}
        source={require("../../assets/images/348s.jpg")}
        className="w-full h-full"
      />
      <View className="absolute flex-row items-center  w-full justify-between mt-10 z-10">
        <TouchableOpacity onPress={() => navigation.navigate("MainPage")}>
          <ChevronLeftIcon color={colors.lightGreen} size={hp(5)} />
        </TouchableOpacity>

        <Text className=" text-white">nablus,betWazaan</Text>
        <TouchableOpacity onPress={() => setActiveBell(!activeBell)}>
          {activeBell ? (
            <BellIcon color={"white"} size={hp(4)} />
          ) : (
            <BellAlertIcon color={"white"} size={hp(4)} />
          )}
        </TouchableOpacity>
      </View>
      <View className="absolute w-full h-full flex items-center justify-center space-x-4 overflow-visible">
        <View
          className="flex-row items-center justify-center bg-neutral-100 px-8 py-6 rounded-lg mt-[70px]"
          style={{ elevation: 9 }}
        >
          <Image
            source={require("../../assets/images/arsenal.png")}
            className="bg-slate-400 rounded-full"
            style={{ width: wp(15), height: wp(15) }}
          />
          <View className="flex items-center justify-center">
            <Text className="text-l font-bold p-2" style={{ color: "black" }}>
              ended
            </Text>
            <Text className="text-l font-bold p-2" style={{ color: "black" }}>
              2 - 6
            </Text>
          </View>

          <Image
            source={require("../../assets/images/manuntd.png")}
            className="bg-slate-400 rounded-full"
            style={{ width: wp(15), height: wp(15) }}
          />
        </View>
      </View>
    </View>
  );
};*/
}

const GameCard = ({
  header,
  discreption,
  score,
  team1,
  team2,
  setInvitedTeamId,
  live,
  team1Id,
  team2Id,
  recentResults1 = [],
  recentResults2 = [],
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [teamImage, setTeamImage] = useState();

  const paddedStreaks1 = [
    ...recentResults1,
    ...Array(4 - recentResults1.length).fill("-"),
  ];
  const paddedStreaks2 = [
    ...recentResults2,
    ...Array(4 - recentResults2.length).fill("-"),
  ];

  const handleTeamPress = (teamId, teamName, teamImage) => {
    console.log("Team ID:", teamId);
    console.log("Team Image:", teamImage);
    console.log("Team name:", teamName);
    setTeamImage(teamImage);
    setInvitedTeamId(teamId);
    setModalVisible(false);
    // You can perform further actions with teamId and teamImage here
  };

  return (
    <View
      style={{
        height: 300,
        backgroundColor: colors.secondColor,
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
      }}
      className="flex items-center justify-center relative "
    >
      {live && (
        <View className="absolute top-[90px] flex-row space-x-1">
          <View className="bg-red-700 rounded-full p-[10px]" />
          <Text>Live</Text>
        </View>
      )}

      <View
        className="px-1 rounded-md"
        style={{
          position: "absolute",
          top: 50,
          backgroundColor: colors.mainColor,
        }}
      >
        <Text style={{ color: colors.lightGreen }}>{header}</Text>
      </View>
      <View className="flex-row items-center justify-center space-x-3">
        <TouchableOpacity
          disabled={team1Id ? false : true}
          onPress={() => navigation.navigate("TeamDetails", { _id: team1Id })}
        >
          <Image
            source={
              team1
                ? { uri: team1 }
                : "https://images.inc.com/uploaded_files/image/1920x1080/goal-soccer_36915.jpg"
            }
            className=" rounded-full "
            style={{
              width: 100,
              height: 100,
              backgroundColor: colors.mainColor,
            }}
          />
        </TouchableOpacity>

        <View
          className="flex items-center justify-center"
          style={{ width: 100, height: 100 }}
        >
          <Text className="text-l font-bold p-2" style={{ color: "black" }}>
            {discreption}
          </Text>
          <Text className="text-l font-bold p-2" style={{ color: "black" }}>
            {score}
          </Text>
        </View>
        <TouchableOpacity
          //   disabled={team2Id ? false : true}
          onPress={() => {
            if (team2Id) {
              navigation.navigate("TeamDetails", { _id: team2Id });
            } else {
              setModalVisible(true);
            }
          }}
        >
          <Image
            source={
              team2
                ? { uri: team2 }
                : teamImage
                ? { uri: teamImage }
                : require("../../assets/images/addteam.png")
            }
            className=" rounded-full"
            style={{
              width: 100,
              height: 100,
              backgroundColor: colors.mainColor,
            }}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                width: 300,
              }}
            >
              <SearchTeam onPress={handleTeamPress} />
              {/* Add your modal content here */}
              {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Close Modal</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </Modal>
        <View
          style={{
            position: "absolute",
            top: 130,
            width: "100%",
          }}
        >
          <View className="flex-row justify-around">
            <View className="flex-row space-x-1">
              {paddedStreaks1 &&
                paddedStreaks1.map((streak, index) => (
                  <View
                    key={index}
                    className="rounded-full p-4 relative flex items-center justify-center"
                    style={{
                      backgroundColor:
                        streak === "W"
                          ? colors.mainColor
                          : streak === "L"
                          ? "#9c0811"
                          : streak === "D"
                          ? colors.myWhite
                          : colors.mainColor, // Assuming the main color for dash
                    }}
                  >
                    <Text
                      style={{
                        color: streak === "D" ? "black" : "white", // Black text for draw
                        position: "absolute",
                      }}
                    >
                      {streak === "W"
                        ? "W"
                        : streak === "L"
                        ? "L"
                        : streak === "D"
                        ? "D"
                        : "-"}
                    </Text>
                  </View>
                ))}
            </View>
            <View className="flex-row space-x-1">
              {paddedStreaks2 &&
                paddedStreaks2.map((streak, index) => (
                  <View
                    key={index}
                    className="rounded-full p-4 relative flex items-center justify-center"
                    style={{
                      backgroundColor:
                        streak === "W"
                          ? colors.mainColor
                          : streak === "L"
                          ? "#9c0811"
                          : streak === "D"
                          ? colors.myWhite
                          : colors.mainColor, // Assuming the main color for dash
                    }}
                  >
                    <Text
                      style={{
                        color: streak === "D" ? "black" : "white", // Black text for draw
                        position: "absolute",
                      }}
                    >
                      {streak === "W"
                        ? "W"
                        : streak === "L"
                        ? "L"
                        : streak === "D"
                        ? "D"
                        : "-"}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GameCard;
