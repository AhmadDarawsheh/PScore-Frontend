import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import React, { useLayoutEffect } from "react";
import colors from "../assets/colors/colors";
import SlidesPicker from "../components/MyComp/SlidesPicker";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useEffect } from "react";
import GameCard from "../components/GameCard";
const PlayerDetails = ({ navigation, route }) => {
  const { token, teamData, triggerEvent, setTeamData } = useAuth();
  const { _id } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [localProfile, setLocalProfile] = useState({});
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    console.log(_id);
    if (teamData && teamData.playerProfile) {
      const exists = teamData.playerProfile.some(
        (profile) => profile._id === _id
      );

      setIsMember(exists);
    }
  }, [teamData]);
  const removePlayer = async () => {
    setIsLoading(true); // Start loading
    console.log(_id);
    try {
      console.log("hello");
      const response = await axios.delete(
        `https://pscore-backend.vercel.app/team/removeplayer/${_id}`,
        {
          headers: {
            authorization: `Ahmad__${token}`,
          },
        }
      );
      console.log(response?.data);
      triggerEvent();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  const addPlayer = async () => {
    setIsLoading(true); // Start loading
    console.log(_id);
    try {
      console.log("hello");
      const response = await axios.post(
        `https://pscore-backend.vercel.app/team/addplayer/${_id}`,
        {},
        {
          headers: {
            authorization: `Ahmad__${token}`,
          },
        }
      );
      console.log(response?.data);
      showAlert("invite sent", "you invited the player");
      triggerEvent();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };
  useEffect(() => {
    console.log(_id);
    const fetchData = async () => {
      console.log(token);
      try {
        console.log(_id);
        const response = await axios.get(
          `https://pscore-backend.vercel.app/profile/${_id}`,
          {},
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );
        // Handle the response here
        setLocalProfile(response.data);
        console.log("pp");
        console.log(response.data);
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.secondColor, // Customize background color
      },
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          <TouchableOpacity
            className="pr-2"
            onPress={() =>
              navigation.navigate("Chat", {
                toMassege: localProfile.email,
                playerid: 400,
              })
            }
          >
            <ChatBubbleBottomCenterIcon size={24} color={"black"} />
          </TouchableOpacity>
          {isLoading ? (
            <ActivityIndicator size={24} color={"black"} />
          ) : isMember ? (
            <TouchableOpacity onPress={removePlayer}>
              <MinusIcon size={24} color={"black"} />
            </TouchableOpacity>
          ) : localProfile.team === "No Team" ? (
            <TouchableOpacity onPress={addPlayer}>
              <PlusIcon size={24} color={"black"} />
            </TouchableOpacity>
          ) : null}
        </View>
      ),
    });
  }, [navigation, isMember, isLoading, teamData, localProfile]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ display: "flex", alignItems: "center" }}
    >
      <View
        style={{
          width: "100%",
          height: 300,
          backgroundColor: colors.secondColor,
          borderBottomEndRadius: 50,
          borderBottomStartRadius: 50,
        }}
        className="flex items-center justify-center relative "
      >
        <View className="absolute top-10">
          <Text>{localProfile?.userName}</Text>
        </View>
        <View
          className="rounded-full border border-red-600 flex items-center justify-center"
          style={{ width: 151, height: 151 }}
        >
          <Image
            className="rounded-full"
            source={{ uri: localProfile?.image }}
            style={{
              width: 150,
              height: 150,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
      <SlidesPicker>
        <View className="flex" dispalyName={"games"}>
          <Games matches={localProfile.playerMatches} />
        </View>

        <View dispalyName={"profile"} className="items-center">
          <UpperStats profile={localProfile} />
          <Stats profile={localProfile} />
        </View>
      </SlidesPicker>
    </ScrollView>
  );
};
const Games = ({ matches }) => {
  return <GameCard matches={matches} name={""} />;
};
const UpperStats = ({ profile }) => {
  return (
    <View className="w-full items-center mt-4">
      <View
        className="flex-row justify-between rounded-md p-1"
        style={{
          width: 300,
          backgroundColor: colors.secondColor,
        }}
      >
        <View className="flex items-center w-[100px]">
          <Image
            style={{
              width: 25,
              height: 25,
              resizeMode: "cover",
            }}
            source={{ uri: "https://flagsapi.com/PS/flat/64.png" }}
          />
          <Text>{profile.country}</Text>
        </View>
        <View className="flex items-center w-[100px]">
          <Image
            style={{
              width: 25,
              height: 25,
              resizeMode: "cover",
            }}
            source={{ uri: "https://flagsapi.com/PS/flat/64.png" }}
          />
          <Text>Nablus</Text>
        </View>
        <View className="flex items-center justify-center w-[100px]">
          <Text>{profile.team}</Text>
        </View>
      </View>
    </View>
  );
};
const Stats = ({ profile }) => {
  return (
    <View
      style={{ backgroundColor: colors.secondColor }}
      className="h-[200px] flex justify-center space-y-6 mt-4 mx-5 rounded-md"
    >
      <View className="flex-row justify-around">
        <View className="flex items-center w-[100px] space-y-4 ">
          <Text>Age</Text>
          <Text>{profile.age}</Text>
        </View>
        <View className="flex items-center w-[100px] space-y-4 ">
          <Text>Position</Text>
          <Text>{profile.position}</Text>
        </View>
        <View className="flex items-center w-[100px] space-y-4 ">
          <Text>phone</Text>
          <Text>{profile.number}</Text>
        </View>
      </View>
      <View className="flex-row justify-around">
        <View className="flex items-center w-[100px] space-y-4 ">
          <Text>Matches</Text>
          <Text>{profile.numberOfEndedMatches}</Text>
        </View>
        <View className="flex items-center w-[100px] space-y-4 ">
          <Image
            className="rounded-full"
            style={{ width: 25, height: 25 }}
            source={require("../assets/images/footballcartoon.jpg")}
          />
          <Text>{profile.goals}</Text>
        </View>
        <View className="flex items-center w-[100px] space-y-4 ">
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/images/assists.png")}
          />
          <Text>{profile.assists}</Text>
        </View>
      </View>
    </View>
  );
};
export default PlayerDetails;
