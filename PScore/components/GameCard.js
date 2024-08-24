import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOutLeft,
} from "react-native-reanimated";
import dayjs from "dayjs";
import { SvgUri } from "react-native-svg";
import { useEffect } from "react";

const GameCard = ({ matches, name }) => {
  // useEffect(() => {
  //   console.log("ss");

  //   console.log(matches2);
  // }, [matches2]);

  return (
    <View
      className="flex  p-4 rounded-md mt-1 mb-4"
      style={{
        width: wp(90),
      }}
    >
      <View className="mb-2 flex-row justify-between items-center">
        <Text className="text-lg" style={{ color: colors.myWhite }}>
          {name}
        </Text>
        <Text style={{ color: colors.myWhite, opacity: 0.6 }}>
          {matches?.length} Match
        </Text>
      </View>
      {/* <View className="mb-2 flex-row justify-between items-center">
        <Text className="text-lg" style={{ color: colors.myWhite }}>
          {matches[0]?.competition?.name}
        </Text>
        <Text style={{ color: colors.myWhite, opacity: 0.6 }}>
          {matches?.length} Match
        </Text>
      </View> */}
      {/* {matches &&
        matches.map((element, index) => (
          <Animated.View
            key={index}
            entering={(entering = FadeInLeft.duration(200 * index))}
          >
            <SingleGame key={index} MatchDetails={element} />
          </Animated.View>
        ))} */}
      {matches &&
        matches.map((element, index) => (
          <Animated.View
            key={index}
            entering={(entering = FadeInLeft.duration(200 * index))}
          >
            <SingleGame key={index} MatchDetails={element} />
          </Animated.View>
        ))}
    </View>
  );
};

// const SingleGame = ({ MatchDetails }) => {
//   const navigation = useNavigation();
//   const dateString = MatchDetails?.utcDate;
//   const time = dayjs(dateString).format("HH:mm");
//   const isSvgHome = MatchDetails?.homeTeam?.crest.endsWith(".svg");
//   const isSvgAway = MatchDetails?.awayTeam?.crest.endsWith(".svg");

//   return (
//     <Pressable
//       className="flex-row justify-center items-center   mb-5 rounded-xl"
//       style={{
//         height: 100,
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 3,
//         },
//         shadowOpacity: 0.27,
//         shadowRadius: 4.65,

//         elevation: 6, //android
//         backgroundColor: colors.myWhite,
//       }}
//       onPress={() =>
//         navigation.navigate("GameDetails", {
//           type: "TIMED",
//         })
//       }
//     >
//       <View
//         className="flex items-end justify-center m-1"
//         style={{ width: 100 }}
//       >
//         <Text style={{ color: colors.mainColor }}>
//           {MatchDetails?.homeTeam?.tla}
//         </Text>
//       </View>
//       {isSvgHome ? (
//         <View className="rounded-full" style={{ width: 35, height: 35 }}>
//           <SvgUri
//             width="100%"
//             height="100%"
//             uri={MatchDetails?.homeTeam?.crest}
//           />
//         </View>
//       ) : (
//         <Image
//           source={{ uri: MatchDetails?.homeTeam?.crest }}
//           className="rounded-full"
//           style={{ width: 35, height: 35 }}
//         />
//       )}

//       <View
//         className="flex items-center  justify-center "
//         style={{ width: 100, height: 90 }}
//       >
//         {MatchDetails?.status === "TIMED" ? (
//           <Text className="font-semibold" style={{ color: colors.secondColor }}>
//             Not started
//           </Text>
//         ) : MatchDetails?.status === "FINISHED" ? (
//           <Text className="font-semibold" style={{ color: colors.secondColor }}>
//             {MatchDetails?.score?.fullTime?.home}:
//             {MatchDetails?.score?.fullTime?.away}
//           </Text>
//         ) : null}
//         {MatchDetails?.status === "FINISHED" ? (
//           <Text style={{ color: colors.secondColor, opacity: 0.7 }}>ended</Text>
//         ) : (
//           <Text style={{ color: colors.secondColor, opacity: 0.7 }}>
//             {time}
//           </Text>
//         )}
//       </View>

//       {isSvgAway ? (
//         <View className="rounded-full" style={{ width: 35, height: 35 }}>
//           <SvgUri
//             width="100%"
//             height="100%"
//             uri={MatchDetails?.awayTeam?.crest}
//           />
//         </View>
//       ) : (
//         <Image
//           source={{ uri: MatchDetails?.awayTeam?.crest }}
//           className="rounded-full"
//           style={{ width: 35, height: 35 }}
//         />
//       )}
//       <View
//         className="flex items-start justify-center m-1"
//         style={{ width: 100 }}
//       >
//         <Text className="text-left" style={{ color: colors.mainColor }}>
//           {MatchDetails?.awayTeam?.tla}
//         </Text>
//       </View>
//     </Pressable>
//   );
// };
const SingleGame = ({ MatchDetails }) => {
  const navigation = useNavigation();
  const dateString = MatchDetails?.utcDate;
  const time = dayjs(dateString).format("HH:mm");
  const isSvgHome = MatchDetails?.homeTeam?.crest.endsWith(".svg");
  const isSvgAway = MatchDetails?.awayTeam?.crest.endsWith(".svg");
  useEffect(() => {
    console.log(MatchDetails);
  }, []);

  return (
    <Pressable
      className="flex-row justify-center items-center   mb-5 rounded-xl"
      style={{
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6, //android
        backgroundColor: colors.myWhite,
      }}
      onPress={() =>
        navigation.navigate("GameDetails", {
          gameid: MatchDetails.id || MatchDetails._id,
        })
      }
    >
      <View className="flex items-end justify-center m-1" style={{ width: 50 }}>
        <Text className="text-center" style={{ color: colors.mainColor }}>
          {MatchDetails?.team1?.teamName || MatchDetails?.team1?.name}
        </Text>
      </View>

      <Image
        source={{
          uri: MatchDetails?.team1?.teamimage
            ? MatchDetails.team1?.teamimage
            : MatchDetails?.team1?.image
            ? MatchDetails.team1?.image
            : "https://icons.veryicon.com/png/o/miscellaneous/site-icon-library/team-28.png",
        }}
        className="rounded-full"
        style={{ width: 35, height: 35 }}
      />

      <View
        className="flex items-center  justify-center "
        style={{ width: 100, height: 90 }}
      >
        {MatchDetails?.status === "timed" ? (
          <>
            <Text
              className="font-semibold pb-2"
              style={{ color: colors.secondColor }}
            >
              Not started
            </Text>
            <Text style={{ color: colors.secondColor, opacity: 0.7 }}>
              {MatchDetails.startTime + "-" + MatchDetails.endTime}
            </Text>
          </>
        ) : MatchDetails?.status === "live" ? (
          <>
            <Text
              className="font-semibold pb-2"
              style={{ color: colors.secondColor }}
            >
              live
            </Text>
            <Text style={{ color: colors.secondColor, opacity: 0.7 }}>
              {MatchDetails.team1Score + "-" + MatchDetails.team2Score}
            </Text>
          </>
        ) : (
          <>
            <Text
              className="font-semibold pb-2"
              style={{ color: colors.secondColor }}
            >
              ended
            </Text>
            <Text style={{ color: colors.secondColor, opacity: 0.7 }}>
              {MatchDetails.team1Score + "-" + MatchDetails.team2Score}
            </Text>
          </>
        )}
        {/* {MatchDetails?.status === "FINISHED" ? (
          <Text style={{ color: colors.secondColor, opacity: 0.7 }}>ended</Text>
        ) : (
          <Text style={{ color: colors.secondColor, opacity: 0.7 }}>
            {time}
          </Text>
        )} */}
      </View>

      <Image
        source={{
          uri: MatchDetails?.team2?.teamimage
            ? MatchDetails.team2?.teamimage
            : MatchDetails?.team2?.image
            ? MatchDetails.team2?.image
            : "https://icons.veryicon.com/png/o/miscellaneous/site-icon-library/team-28.png",
        }}
        className="rounded-full"
        style={{ width: 35, height: 35 }}
      />

      <View
        className="flex items-start justify-center m-1"
        style={{ width: 50 }}
      >
        <Text className="text-center" style={{ color: colors.mainColor }}>
          {MatchDetails?.team2?.teamName || MatchDetails?.team2?.name}
        </Text>
      </View>
    </Pressable>
  );
};

const SingleGame2 = () => {
  return (
    <View
      className="flex-row justify-center items-center  bg-slate-200 mb-2"
      style={{ height: 100 }}
    >
      <View
        className="flex items-end justify-center m-1"
        style={{ width: 100 }}
      >
        <Text>Man City</Text>
      </View>

      <View
        className="bg-slate-500 rounded-full"
        style={{ width: 35, height: 35 }}
      />
      <View
        className="flex items-center  justify-center "
        style={{ width: 100, height: 90 }}
      >
        <Text>ended</Text>
        <Text style={{ color: colors.secondColor }}>1 - 4</Text>
        <Text style={{ color: colors.secondColor }}>AM 10:00</Text>
      </View>
      <View
        className="bg-slate-500 rounded-full"
        style={{ width: 35, height: 35 }}
      />
      <View
        className="flex items-start justify-center m-1"
        style={{ width: 100 }}
      >
        <Text>Everton</Text>
      </View>
    </View>
  );
};

export default GameCard;
