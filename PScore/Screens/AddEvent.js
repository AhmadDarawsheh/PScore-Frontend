import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../assets/colors/colors";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";
import MatchCounter from "../components/MatchCounter";
import axios from "axios";
import dayjs from "dayjs";
const emojisWithIcons = [
  { title: "happy", icon: "emoticon-happy-outline" },
  { title: "cool", icon: "emoticon-cool-outline" },
  { title: "lol", icon: "emoticon-lol-outline" },
  { title: "sad", icon: "emoticon-sad-outline" },
  { title: "cry", icon: "emoticon-cry-outline" },
  { title: "angry", icon: "emoticon-angry-outline" },
  { title: "confused", icon: "emoticon-confused-outline" },
  { title: "excited", icon: "emoticon-excited-outline" },
  { title: "kiss", icon: "emoticon-kiss-outline" },
  { title: "devil", icon: "emoticon-devil-outline" },
  { title: "dead", icon: "emoticon-dead-outline" },
  { title: "wink", icon: "emoticon-wink-outline" },
  { title: "sick", icon: "emoticon-sick-outline" },
  { title: "frown", icon: "emoticon-frown-outline" },
];
const teams = [
  { name: "team1", icon: "emoticon-happy-outline" },
  { name: "team2", icon: "emoticon-cool-outline" },
];

const AddEvent = ({ route }) => {
  const navigation = useNavigation();
  const { gameid, counterTime, players1, players2 } = route?.params || {};
  const { profile, token } = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.secondColor, // Customize background color
      },
    });
  }, [navigation]);
  const [isTeamSelected, setIsTeamSelected] = useState(false);

  const [isGoalSelected, setIsGoalSelected] = useState(false);
  useEffect(() => {
    console.log(isGoalSelected);
  }, []);
  const [goalPlayer, setGoalPlayer] = useState();
  const [assistPlayer, setAssistPlayer] = useState();
  const handleAddEvent = async (values) => {
    // console.log(gameid);
    // console.log(inviteId);

    // const payload = {
    //   response: "rejected",
    //   inviteId,
    // };
    try {
      const response = await axios.post(
        `https://pscore-backend.vercel.app/match/addmatchevent/${gameid}`,
        values,
        {
          headers: {
            authorization: `Ahmad__${token}`,
          },
        }
      );
      console.log(response?.data);
      navigation.goBack();
    } catch (error) {
      console.error(" error:", error);
    }
  };
  return (
    <View className="flex-1 items-center justify-center space-y-3 relative">
      <Image
        className="absolute h-screen"
        source={require("../assets/images/footballMessageBack.jpeg")}
        style={{ width: "100%", resizeMode: "cover" }}
      />
      <View className="flex-row items-center justify-between space-x-4 absolute top-0">
        <View className="border border-green-700 rounded-full ">
          <Image
            className="w-[50px] h-[50px]  rounded-full"
            source={
              profile.image
                ? { uri: profile.image }
                : require("../assets/images/defaultUserImage.jpg")
            }
            style={{ resizeMode: "contain" }}
          />
        </View>
        <Text>{profile.userName}</Text>
      </View>
      <View>
        <SelectDropdown
          data={teams}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            if (selectedItem) {
              setIsTeamSelected(selectedItem);
            }
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {/* {selectedItem && (
                <Icon
                  name={selectedItem.icon}
                  style={styles.dropdownButtonIconStyle}
                />
              )} */}
                {/* {selectedItem && (
                <Image
                  source={
                    selectedItem.photo
                      ? { uri: selectedItem.photo }
                      : require("../assets/images/defaultUserImage.jpg")
                  }
                  className="w-[30px] h-[30px] rounded-full"
                />
              )} */}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.name) || "Select the team"}
                </Text>
                {/* <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              /> */}
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                {/* <Image
                source={
                  item.photo
                    ? { uri: item.photo }
                    : require("../assets/images/defaultUserImage.jpg")
                }
                className="w-[30px] h-[30px] rounded-full"
              /> */}
                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>

      {isTeamSelected && (
        <View>
          <SelectDropdown
            data={isTeamSelected.name == "team1" ? players1 : players2}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              if (selectedItem) {
                setIsGoalSelected(true);
                setGoalPlayer({
                  goal: selectedItem.name,
                  goalId: selectedItem.playerId,
                });
              }
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {/* {selectedItem && (
                <Icon
                  name={selectedItem.icon}
                  style={styles.dropdownButtonIconStyle}
                />
              )} */}
                  {selectedItem && (
                    <Image
                      source={
                        selectedItem.photo
                          ? { uri: selectedItem.photo }
                          : require("../assets/images/defaultUserImage.jpg")
                      }
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.name) || "Select the player"}
                  </Text>
                  {/* <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              /> */}
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                  <Image
                    source={
                      item.photo
                        ? { uri: item.photo }
                        : require("../assets/images/defaultUserImage.jpg")
                    }
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
      )}

      {isGoalSelected && (
        <View>
          <SelectDropdown
            data={isTeamSelected.name == "team2" ? players2 : players1}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              if (selectedItem) {
                setIsGoalSelected(true);
                setAssistPlayer({
                  assist: selectedItem.name,
                  assistId: selectedItem.playerId,
                });
              }
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {/* {selectedItem && (
              <Icon
                name={selectedItem.icon}
                style={styles.dropdownButtonIconStyle}
              />
            )} */}
                  {selectedItem && (
                    <Image
                      source={
                        selectedItem.photo
                          ? { uri: selectedItem.photo }
                          : require("../assets/images/defaultUserImage.jpg")
                      }
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.name) || "Select the player"}
                  </Text>
                  {/* <Icon
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            /> */}
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                  <Image
                    source={
                      item.photo
                        ? { uri: item.photo }
                        : require("../assets/images/defaultUserImage.jpg")
                    }
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          // assuming this is the format you have
          const minutes = counterTime?.split(":")[0];

          const mergedJson = {
            ...goalPlayer,
            ...assistPlayer,
            team: isTeamSelected.name,
            time: minutes, //44
          };
          const event = {
            event: mergedJson,
          };

          console.log(event);
          handleAddEvent(event);
        }}
      >
        <View
          className="py-2 px-3 rounded-md"
          style={{ backgroundColor: colors.lightGreen }}
        >
          <Text>add event</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default AddEvent;
