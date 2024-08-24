import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect, Component } from "react";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import { useCallback } from "react";
// import { v4 as uuid } from "uuid";

import { useChats } from "../contexts/ChatsContext";
import { useLayoutEffect } from "react";
import colors from "../assets/colors/colors";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
// const socket = io.connect("http://localhost:4000");

const Chat = ({ navigation, route }) => {
  const { toMassege, roomid } = route.params;
  //   const roomid = 900;
  const {
    allChatRooms,
    setAllChatRooms,
    user,
    socket,
    roomMasseges,
    setRoomMasseges,
    isLoading,
    setIsLoading,
  } = useChats();

  const [newChatMassege, setNewChatMassege] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [part1, setPart1] = useState();
  const [part2, setPart2] = useState();
  const [newRoom, setNewRoom] = useState();

  const { profile } = useAuth();
  //   const joinRoom = () => {
  //     if (username !== "") {
  //       socket.emit("join_room", roomid);
  //     }
  //   };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.secondColor, // Customize background color
      },
      headerTitle: "Masseges",
    });
  }, [navigation]);
  //   useEffect(() => {
  //     console.log(roomMasseges);
  //     setMessageList[roomMasseges];
  //   }, [roomMasseges]);

  // useEffect(() => {
  //   socket.emit("getAllGroups");
  // }, []);
  useEffect(() => {
    toMassege;
    let part1 = "";
    let part2 = "";
    if (roomid) {
      const emailString = roomid;
      const emailParts = emailString.split("_");
      console.log(emailParts);
      if (profile.email == emailParts[0]) {
        part1 = emailParts[0];
        part2 = emailParts[1];
        setPart2(part2);
      } else if (profile.email == emailParts[1]) {
        part1 = emailParts[1];
        part2 = emailParts[0];
        setPart2(part2);
      }
    } else {
      console.log("hh");

      part1 = profile.email;
      part2 = toMassege;
      const roomID = [part1, part2].sort().join("_");
      setNewRoom(roomID);
    }

    socket.emit("join_room", { part1, part2 });

    // Listening for "private_message" event
    const handlePrivateMessage = (data) => {
      if (data.sender == part2) {
        console.log("New message:", data);
        setMessageList((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.on("private_message", handlePrivateMessage);

    // Clean up socket listener when component unmounts
    return () => {
      socket.off("private_message", handlePrivateMessage);
    };
  }, []);

  // useEffect(() => {
  //   socket.on("groupMassge", (data) => {
  //     console.log(data);
  //     setNewChatMassege(data);
  //   });
  // }, []);
  // useEffect(() => {
  //   socket.emit("findGroup", roomid);
  // }, [newChatMassege]);
  // useEffect(() => {
  //   socket.on("foudGroup", (data) => setMessageList(data));
  // }, [socket]);
  return (
    <View className="flex-1 items-center relative">
      <Image
        className="absolute h-screen"
        source={require("../assets/images/footballMessageBack.jpeg")}
        style={{ width: "100%", resizeMode: "cover" }}
      />
      <MyChat
        socket={socket}
        username={user}
        messageList={messageList}
        setMessageList={setMessageList}
        allChatRooms={allChatRooms}
        roomID={newRoom || roomid}
        sender={profile.email}
        receiver={part2}
      />
    </View>
  );
};
const MyChat = ({
  socket,
  username,
  roomID,
  sender,
  receiver,
  setMessageList,
  messageList,
}) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMassege = () => {
    if (username && currentMessage != "") {
      socket.emit("send_message", {
        // currentMessageID: Math.random(),
        // currentUser: username,
        message: currentMessage,
        sender,
        receiver,
        roomID,
      });
      // socket.emit("findGroup", room);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    // socket.on("private_message", (data) => {
    //   console.log(data);
    //   socket.emit("get_room_messages", roomID);
    //   // setMessageList(data);
    //   // setNewChatMessage(data);
    // });
  }, [socket]);
  useEffect(() => {
    socket.on("private_message_history", (data) => {
      console.log(data);
      setMessageList(data);
      // setNewChatMessage(data);
    });
  }, []);

  return (
    <View className="flex-1 justify-end items-end w-full">
      {/* {console.log(messageList)} */}
      {messageList && messageList[0] ? (
        <View className="flex-1 w-full">
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={messageList}
            renderItem={({ item, index }) => (
              <Bubble key={index} item={item} user={sender} />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      ) : (
        ""
      )}

      <View className="flex-row justify-center items-center space-x-3 bg-white w-full">
        <View className="border border-green-600 rounded-lg mt-2">
          <TextInput
            className="px-1 py-2 w-[200px] "
            value={currentMessage}
            onChangeText={(value) => setCurrentMessage(value)}
            placeholder="enter text"
          />
        </View>

        <TouchableOpacity
          onPress={sendMassege}
          className="bg-green-600 px-3 py-1 rounded-md"
        >
          <Text>enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Bubble = ({ item, user }) => {
  const dayjs = require("dayjs");
  const timestamp = item.timestamp;

  // Get formatted date
  const formattedDate = dayjs(timestamp).format("MM-DD");

  // Get minutes
  const minutes = dayjs(timestamp).format("HH:mm");

  console.log("Date:", formattedDate); // Output: Date: 2024-06-27
  console.log("Minutes:", minutes); // Output: Minutes: 5
  const time = minutes + " " + formattedDate;
  const currentUserStatus = item?.sender !== user;
  return (
    <View
      className="flex justify-center "
      style={
        currentUserStatus
          ? { alignItems: "flex-start" }
          : { alignItems: "flex-end" }
      }
    >
      <View
        className={`flex justify-center rounded-md my-3 mx-1 w-[200px] p-2 ${
          currentUserStatus ? "bg-white" : "bg-green-600"
        }`}
      >
        <Text className="text-md">{item.message}</Text>
        <View className="flex-row items-center space-x-3 opacity-50">
          <Text className="text-sm">{minutes}</Text>
          <Text className="text">{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default Chat;
