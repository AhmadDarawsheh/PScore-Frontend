// import React, { useState, useCallback, useEffect } from "react";
// import { GiftedChat } from "react-native-gifted-chat";

// const Notifications = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Hello developer",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "React Native",
//           avatar: require("../../assets/images/players/haaland.png"),
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages)
//     );
//   }, []);

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(messages) => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//     />
//   );
// };
import { View, Text, Image, ScrollView, Alert } from "react-native";
import React from "react";
import Header from "../../components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useState } from "react";
const Notifications = ({ navigation }) => {
  const { token, triggerInvites, triggerInvitesEvent, profile } = useAuth();
  const [invites, setInvites] = useState([]);
  const [playerInvites, setPlayerInvites] = useState([]);
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };
  const handleAccept = async (inviteId) => {
    const payload = {
      response: "accepted",
      inviteId,
    };
    try {
      const response = await axios.post(
        `https://pscore-backend.vercel.app/team/playerinviteresponse`,
        payload,
        {
          headers: {
            authorization: `Ahmad__${token}`,
          },
        }
      );

      console.log(response?.data);
      triggerInvitesEvent();
      showAlert("invite responded", "you accept the invintation");
    } catch (error) {
      console.error(" error:", error);
    }
  };
  const handleDeny = async (inviteId) => {
    const payload = {
      response: "rejected",
      inviteId,
    };
    console.log("rejected");
    try {
      const response = await axios.post(
        `https://pscore-backend.vercel.app/team/playerinviteresponse`,
        payload,
        {
          headers: {
            authorization: `Ahmad__${token}`,
          },
        }
      );
      console.log(response?.data);
      showAlert("invite responded", "you denyed the inventation");
      triggerInvitesEvent();
    } catch (error) {
      console.error(" error:", error);
    }
  };
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(
          `https://pscore-backend.vercel.app/team/invitation`,
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );
        setInvites(response?.data?.allInvites);
        console.log(response?.data?.allInvites);
      } catch (error) {
        console.error("Login error:", error);
      }
    };
    const getPlayerNotifications = async () => {
      try {
        const response = await axios.get(
          `https://pscore-backend.vercel.app/team/playerinvitation`,
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );
        setInvites(response?.data?.invites);
        // console.log(response?.data);
      } catch (error) {
        console.error("Login error:", error);
      }
    };

    if (profile.userType == "manager") {
      getNotifications();
    } else {
      getPlayerNotifications();
    }
  }, [token, triggerInvites]);
  return (
    <View className="flex-1">
      <ScrollView>
        {profile.userType == "manager" ? (
          <View className="w-full h-full flex items-center">
            {/* Request */}
            {invites &&
              invites
                .slice()
                .reverse()
                .map((item, index) => (
                  <View
                    key={index}
                    className="bg-white my-2 flex-row items-center space-x-3"
                    style={{ width: wp(90), height: 100 }}
                  >
                    <Image
                      className="rounded-full"
                      style={{ width: 70, height: 70, resizeMode: "stretch" }}
                      source={{ uri: item.image }}
                    />
                    <View className="flex items-start  justify-center">
                      <Text>{item.message}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("GameDetails", {
                            type: "pending",
                            gameid: item.match,
                            inviteId: item._id,
                          })
                        }
                        className="bg-green-400 py-2 px-4 rounded-md"
                      >
                        <Text>View</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
          </View>
        ) : profile.userType == "player" ? (
          <View className="w-full h-full flex items-center">
            {/* Request */}
            {invites &&
              invites
                .slice()
                .reverse()
                .map((item, index) => (
                  <View
                    key={index}
                    className="bg-white my-2 flex-row items-center space-x-3"
                    style={{ width: wp(90), height: 100 }}
                  >
                    <Image
                      className="rounded-full"
                      style={{ width: 70, height: 70, resizeMode: "stretch" }}
                      source={{ uri: item.image }}
                    />
                    <View className="flex items-start  justify-center">
                      <Text>{item.message}</Text>
                      <View className="flex-row space-x-2">
                        <TouchableOpacity
                          onPress={() => handleAccept(item._id)}
                          className="bg-green-400 py-2 px-4 rounded-md"
                        >
                          <Text>accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDeny(item._id)}
                          className="bg-red-400 py-2 px-4 rounded-md"
                        >
                          <Text>deny</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Notifications;
