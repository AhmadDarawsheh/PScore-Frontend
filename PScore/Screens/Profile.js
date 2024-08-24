import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import colors from "../assets/colors/colors";
import { CameraIcon, HeartIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native-gesture-handler";
import AuthContext, { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import SlidesPicker from "../components/MyComp/SlidesPicker";
import DetailsTable from "../components/DetailsTable";
import Player from "../components/Player";
import GameCard from "../components/GameCard";

const Profile = () => {
  const { token, getUser, profile, teamData } = useAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   console.log(team);
  //   console.log("hello team");
  // }, [team]);
  // useEffect(() => {
  //   if (token) {
  //     console.log(token);
  //     // const decoded = decodeToken(token);
  //     const user = getUser(token);
  //     console.log("ll");

  //     console.log(user);
  //     setUser(user);
  //     // Store the decoded token in state
  //   }
  // }, [token]);

  return (
    <ScrollView>
      <View className="h-[300px] flex items-center justify-center relative space-y-1">
        <View
          className="relative rounded-full border "
          style={{ backgroundColor: colors.mainColor }}
        >
          {profile && profile.image != "" ? (
            <Image
              source={{ uri: profile.image }}
              className="w-[150px] h-[150px] rounded-full"
            />
          ) : (
            <Image
              source={require("../assets/images/defaultUserImage.jpg")}
              className="w-[150px] h-[150px] rounded-full"
            />
          )}
          <View className="absolute top-0 right-0 bg-white rounded-full p-1">
            <CameraIcon size={30} color={"black"} />
          </View>
        </View>
        <Text>{profile ? profile?.userName : "no login"}</Text>
        <Text className="font-bold">{profile ? profile?.userType : ""}</Text>
        {/* <Text>{user ? user?.type : "no login"}</Text> */}
        <View
          className="flex-row justify-around rounded-md p-1"
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
            <Text>Nablus</Text>
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
            <Text>{profile?.country}</Text>
          </View>
          {profile.userType == "player" && (
            <View className="flex items-center justify-center w-[100px]">
              {/* <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: "cover",
              }}
              source={{ uri: "https://flagsapi.com/PS/flat/64.png" }}
            /> */}
              <Text>{profile.team}</Text>
            </View>
          )}
        </View>
      </View>

      <SlidesPicker>
        {profile.userType == "player" && (
          <View className="flex items-center" dispalyName={"games"}>
            <GameCard matches={profile?.playerMatches} />
          </View>
        )}
        <Stats dispalyName="Profile" loading={loading} profile={profile} />
      </SlidesPicker>
    </ScrollView>
  );
};

const Stats = ({ loading, profile }) => {
  return loading ? (
    <ActivityIndicator />
  ) : (
    <View
      style={{ backgroundColor: colors.secondColor }}
      className="h-[200px] flex justify-center space-y-6 mt-4 mx-5 rounded-md"
    >
      <View className="flex-row justify-around">
        <View className="flex items-center w-[100px] space-y-4 ">
          <Text>Age</Text>
          <Text>{profile.age}</Text>
        </View>
        {profile.userType == "player" && (
          <View className="flex items-center w-[100px] space-y-4 ">
            <Text>Position</Text>
            <Text>{profile.position}</Text>
          </View>
        )}

        <View className="flex items-center w-[100px] space-y-4 ">
          <Text>phone</Text>
          <Text>{profile.number}</Text>
        </View>
        {profile.userType == "user" && (
          <View className="flex items-center w-[100px] space-y-4 ">
            <Text>Trust level</Text>
            <Text>{profile.trustLevel}</Text>
          </View>
        )}
      </View>
      {profile.userType == "player" && (
        <View className="flex-row justify-around">
          <View className="flex items-center w-[100px] space-y-4 ">
            <Text>Matches</Text>
            <Text>{profile?.numberOfEndedMatches}</Text>
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
      )}
    </View>
  );
};
export default Profile;
