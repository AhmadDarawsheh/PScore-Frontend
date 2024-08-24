import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../components/Header.js";
const colors = require("../assets/colors/colors.js");
import GameCard from "../components/GameCard.js";
import dayjs from "dayjs";
import axios from "axios";
import { Formik } from "formik";
import Line from "../components/Line.js";
import DayPicker from "../components/DayPicker.js";
import { useAuth } from "../contexts/AuthContext.js";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
const Home = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [day, setDay] = useState(dayjs().format("YYYY-MM-DD"));

  const [matches, setMatches] = useState([]);

  const { token } = useAuth();
  const [matchesData, setMatchesData] = useState();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.football-data.org/v4/competitions/PD/matches/?season=2023&dateFrom=${day}&dateTo=${day}`,
  //         {
  //           headers: {
  //             "X-Auth-Token": "561656b64db54bc8b5d5534f66275f4f", // Replace 'YOUR_TOKEN' with your actual token
  //           },
  //         }
  //       );
  //       if (response.data) {
  //         const Objects = response.data.matches.map((element, index) => {
  //           // Transform each element as needed
  //           return element;
  //         });
  //         setMatches([]);
  //         setMatches(Objects);
  //       } else {
  //         console.log("Table data not available");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       // Handle errors
  //     }
  //   };
  //   fetchData();
  // }, [day]);
  useEffect(() => {
    const getMatches = async () => {
      try {
        const response = await axios.get(
          `https://pscore-backend.vercel.app/match/gettimedmatch/${day}`,
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );
        if (response.data) {
          // const Objects = response.data.matches.map((element, index) => {
          //   // Transform each element as needed
          //   return element;
          // });
          // setMatches([]);
          // setMatches(Objects);
          console.log(response.data);
          setMatchesData(response?.data?.data);
        } else {
          console.log("Table data not available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors
      }
    };

    getMatches();
  }, [day]);
  return (
    <View className="flex-1" style={{ backgroundColor: colors.secondColor }}>
      <StatusBar style="dark" />
      <DayPicker day={day} setDay={setDay} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ display: "flex", alignItems: "center" }}
      >
        {matchesData &&
          matchesData.length > 0 &&
          matchesData.map((item) => (
            <GameCard
              key={item.id}
              matches={
                matchesData && matchesData.length > 0 ? item?.matches : []
              }
              name={
                matchesData && matchesData.length > 0
                  ? item?.playgroundName
                  : ""
              }
            />
          ))}

        {/* <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: colors.mainColor }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MessagesScreen")}>
          <Text style={{ color: colors.mainColor }}>MessagesScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Text style={{ color: colors.mainColor }}>chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("TeamDetails")}>
          <Text style={{ color: colors.mainColor }}>TeamDetails</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Home;
