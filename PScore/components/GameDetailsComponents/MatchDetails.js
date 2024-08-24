import { View, Text, Image } from "react-native";
import React from "react";
import { ClockIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DetailsTable from "../DetailsTable";
import { useEffect } from "react";
const MatchDetails = ({ events, newEvents, ended }) => {
  useEffect(() => {
    console.log(newEvents);
  }, []);

  return (
    <DetailsTable classes="mt-10" header="match events">
      <View className="flex-col-reverse items-center justify-start pt-4">
        <ClockIcon color={"black"} />
        {newEvents.map((item, index) => {
          if (item.team == "team1") {
            return (
              <View key={index} className="flex items-center">
                <Event
                  team1Goal={item.goal}
                  team1Asist={item.assist}
                  time={item.time}
                />
                <VerticalLine />
              </View>
            );
          } else if (item.team == "team2") {
            return (
              <View key={index} className="flex items-center">
                <Event
                  team2Goal={item.goal}
                  team2Asist={item.assist}
                  time={item.time}
                />
                <VerticalLine />
              </View>
            );
          }
        })}
        {ended && <Event time={"end"} />}
      </View>
    </DetailsTable>
  );
};
const Event = ({ team1Goal, team1Asist, time, team2Goal, team2Asist }) => {
  return (
    <View
      className=" flex-row items-center justify-between "
      style={{ width: wp(80) }}
    >
      <View className=" w-[40%] flex items-start ">
        <View className="flex-row justify-center items-center space-x-1">
          {team1Goal && (
            <>
              <Text>{team1Goal}</Text>
              <Image
                className="rounded-full"
                source={require("../../assets/images/footballcartoon.jpg")}
                style={{ width: 15, height: 15 }}
              />
            </>
          )}
        </View>
        <View className="flex-row justify-center items-center space-x-1">
          {team1Asist && (
            <>
              <Text>{team1Asist}</Text>
              <Image
                source={require("../../assets/images/assists.png")}
                style={{ width: 15, height: 15 }}
              />
            </>
          )}
        </View>
      </View>
      <View className=" w-[10%] flex items-center">
        <Text>{time}</Text>
      </View>
      <View className=" w-[40%] flex items-end">
        {team2Goal && (
          <>
            <View className="flex-row justify-center items-center space-x-1">
              <Text>{team2Goal}</Text>
              <Image
                className="rounded-full"
                source={require("../../assets/images/footballcartoon.jpg")}
                style={{ width: 15, height: 15 }}
              />
            </View>
          </>
        )}
        {team2Asist && (
          <>
            <View className="flex-row justify-center items-center space-x-1">
              <Text>{team2Asist}</Text>
              <Image
                source={require("../../assets/images/assists.png")}
                style={{ width: 15, height: 15 }}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export const VerticalLine = () => <View className="w-[2px] h-6 bg-black" />;

export default MatchDetails;
