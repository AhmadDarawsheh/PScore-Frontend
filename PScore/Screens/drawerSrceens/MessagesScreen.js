import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import ChatsContext from "../../contexts/ChatsContext";
import { useChats } from "../../contexts/ChatsContext";
import { useEffect } from "react";
import io from "socket.io-client";
import { useLayoutEffect } from "react";
import colors from "../../assets/colors/colors";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
// const socket = io.connect("http://localhost:4000");
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
const MessagesScreen = ({ navigation }) => {
  const { socket, user, setUser, allChatRooms, setAllChatRooms } = useChats();
  const { profile } = useAuth();
  const [rooms, setRooms] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.secondColor, // Customize background color
      },
    });
  }, [navigation]);
  useFocusEffect(
    useCallback(() => {
      // Your logic here, it will run every time the screen is focused
      // Forcing a state change to cause a rerender
      console.log("Home Screen is focused");
      socket.emit("get_user_rooms", profile.email);
      setRooms([]);
    }, [])
  );

  useEffect(() => {
    socket.on("user_rooms", (data) => {
      console.log(data);

      setRooms(data);
    });
  }, []);
  return (
    <View className="relative">
      <Image
        className="absolute h-screen"
        source={require("../../assets/images/footballMessageBack.jpeg")}
        style={{ width: "100%", resizeMode: "cover" }}
      />
      {rooms
        ? rooms.map((item, index) => (
            <Item
              item={item}
              navigation={navigation}
              key={index}
              name={profile.email}
            />
          ))
        : // <FlatList
          //   data={rooms}
          //   renderItem={({ item, index }) => (
          //     <Item key={index} item={item} navigation={navigation} />
          //   )}
          //   keyExtractor={(item) => item.chatGroupName}
          // />
          null}
      {/* <Text>{user ? user : ""}</Text> */}
    </View>
  );
};
const Item = ({ item, navigation, name }) => {
  const [profiles, setProfiles] = useState({});
  useEffect(() => {
    const emailParts = item.roomID.split("_");
    const handleGetProfiles = async (value) => {
      try {
        const response = await axios.get(
          `https://pscore-backend.vercel.app/auth/getuser/${value}`,
          {}
        );
        if (response.data) {
          console.log(value);
          console.log(response.data);
          setProfiles(response?.data?.profile);
        } else {
          console.log("Table data not available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors
      }
    };
    if (emailParts[0] == name) {
      handleGetProfiles(emailParts[1]);
    } else if (emailParts[1] == name) {
      handleGetProfiles(emailParts[0]);
    }
  }, []);
  const dayjs = require("dayjs");
  const timestamp = item.lastMessage.timestamp;
  const formattedTime = dayjs(timestamp).format("HH:mm");
  console.log(formattedTime); // Output: 10:05

  return (
    <TouchableOpacity
      className="flex-row items-center m-3 p-3 space-x-2"
      style={{ backgroundColor: "white" }}
      onPress={() => navigation.navigate("Chat", { roomid: item.roomID })}
    >
      <Image
        source={
          profiles?.image
            ? { uri: profiles?.image }
            : require("../../assets/images/defaultUserImage.jpg")
        }
        className="rounded-full"
        style={{ width: 50, height: 50 }}
      />
      <View className="">
        <Text className="font-bold text-lg">{profiles?.userName}</Text>
        <View className="flex-row space-x-3">
          <Text>{item.lastMessage.message}</Text>
          <Text>{formattedTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MessagesScreen;
