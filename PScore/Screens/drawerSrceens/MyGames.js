import { View, Text, ScrollView } from "react-native";
import React from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import GameCard from "../../components/GameCard";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
const MyGames = () => {
  const { token } = useAuth();
  const [matches, setMatches] = useState();
  useFocusEffect(
    useCallback(() => {
      const getMyMatches = async () => {
        try {
          const response = await axios.get(
            "https://pscore-backend.vercel.app/team/mymatches",
            {
              headers: {
                authorization: `Ahmad__${token}`,
              },
            }
          );
          const reversedMatches = response?.data?.myMatches.reverse();
          setMatches(reversedMatches);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      getMyMatches();
      // console.log("ss");
    }, [])
  );
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ display: "flex", alignItems: "center" }}
    >
      <View className="flex" dispalyName={"games"}>
        <GameCard matches={matches} name={""} />
      </View>
    </ScrollView>
  );
};

export default MyGames;
