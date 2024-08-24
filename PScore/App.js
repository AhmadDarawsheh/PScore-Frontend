import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import Welcome from "./Screens/Welcome";
import PageTest from "./Screens/PageTest";
import News from "./Screens/News";
import Home from "./Screens/Home";
import Login from "./Screens/Login.js";
import SignUp from "./Screens/SignUp.js";
import Notifications from "./Screens/drawerSrceens/Notifications.js";
import {
  HomeIcon,
  NewspaperIcon,
  BellAlertIcon,
  UserCircleIcon,
  GlobeAsiaAustraliaIcon,
  ArchiveBoxArrowDownIcon,
} from "react-native-heroicons/solid";
const colors = require("./assets/colors/colors.js");
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

import {
  HomeIcon as HomeIconLine,
  NewspaperIcon as NewspaperIconLine,
  BellAlertIcon as BellAlertIconLine,
  UserCircleIcon as UserCircleIconLine,
  GlobeAsiaAustraliaIcon as GlobeAsiaAustraliaIconLine,
  ArchiveBoxArrowDownIcon as ArchiveBoxArrowDownIconLine,
  Cog6ToothIcon,
  MapIcon,
  ArrowLeftStartOnRectangleIcon,
  UserGroupIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  ChatBubbleBottomCenterIcon,
} from "react-native-heroicons/outline";
import Profile from "./Screens/Profile.js";
import GameDetails from "./Screens/GameDetails.js";
import Explore from "./Screens/Explore.js";
import MyGames from "./Screens/drawerSrceens/MyGames.js";
import Settings from "./Screens/drawerSrceens/Settings.js";
import Stadium from "./Screens/Stadium.js";
import Search from "./Screens/Search.js";
import MapScreen from "./Screens/drawerSrceens/MapScreen.js";
import AuthContext, { AuthProvider, useAuth } from "./contexts/AuthContext.js";
import { ChatsProvider, useChats } from "./contexts/ChatsContext.js";
import PlayerDetails from "./Screens/PlayerDetails.js";
import LogOut from "./Screens/drawerSrceens/LogOut.js";
import Chat from "./Screens/Chat.js";
import MessagesScreen from "./Screens/drawerSrceens/MessagesScreen.js";
import { useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import MyTeam from "./Screens/drawerSrceens/MyTeam.js";
import AddEvent from "./Screens/AddEvent.js";
import TeamDetails from "./Screens/TeamDetails.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const mySocket = io.connect("http://192.168.1.5:4000");

export default function App() {
  return (
    <AuthProvider>
      <ChatsProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ title: "Welcome" }}
            />
            <Stack.Screen name="MainPage" component={MyTabsDrower} />
            <Stack.Screen name="GameDetails" component={GameDetails} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Stadium" component={Stadium} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="PlayerDetails" component={PlayerDetails} />
            <Stack.Screen name="TeamDetails" component={TeamDetails} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="AddEvent" component={AddEvent} />
          </Stack.Navigator>
        </NavigationContainer>
      </ChatsProvider>
    </AuthProvider>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.secondColor,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            icon = focused ? (
              <HomeIcon color={color} size={size} />
            ) : (
              <HomeIconLine color={color} size={size} />
            );
            return icon;
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            icon = focused ? (
              <GlobeAsiaAustraliaIcon color={color} size={size} />
            ) : (
              <GlobeAsiaAustraliaIconLine color={color} size={size} />
            );
            return icon;
          },
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            icon = focused ? (
              <NewspaperIcon color={color} size={size} />
            ) : (
              <NewspaperIconLine color={color} size={size} />
            );
            return icon;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            icon = focused ? (
              <UserCircleIcon color={color} size={size} />
            ) : (
              <UserCircleIconLine color={color} size={size} />
            );
            return icon;
          },
        }}
      />
    </Tab.Navigator>
  );
}
function MyTabsDrower() {
  const navigation = useNavigation();
  const {
    profile,
    setProfile,
    token,
    setPlaygrounds,
    setTeamData,
    teamData,
    trigger,
    setMySocket,
  } = useAuth();
  const { socket, setSocket, setAllChatRooms, setroomMasseges, setIsLoading } =
    useChats();
  useEffect(() => {
    setSocket(mySocket);
    mySocket.emit("getAllGroups");
  }, []);

  useEffect(() => {
    // mySocket.emit("getAllGroups");
    mySocket.on("group_list", (groups) => {
      console.log(groups);
      setAllChatRooms(groups);
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      console.log("hello token");
      console.log(token);
      try {
        const response = await axios.get(
          "https://pscore-backend.vercel.app/playground",
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );
        // console.log(response.data[0]);
        setPlaygrounds(response.data);
        // setProfile(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  useEffect(() => {
    const fetchData = async () => {
      console.log("hello token");
      console.log(token);
      try {
        const response = await axios.get(
          "https://pscore-backend.vercel.app/profile",
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );
        console.log("my profile");
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);
  useEffect(() => {
    if (profile.userType == "manager") {
      console.log("manager account");
      setTeamData({});
      const getTeam = async () => {
        try {
          const response = await axios.get(
            "https://pscore-backend.vercel.app/team",
            {
              headers: {
                authorization: `Ahmad__${token}`,
              },
            }
          );
          console.log(response.data);
          setTeamData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      getTeam();
    }
  }, [profile, token, trigger]);

  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => {
        return (
          <View>
            <View className="h-[300px] flex items-center justify-center">
              <View className="bg-zinc-800 w-[150px] h-[150px] rounded-full mb-2">
                {profile && profile.image != "" ? (
                  <Image
                    source={{ uri: profile.image }}
                    className="w-[150px] h-[150px] rounded-full"
                  />
                ) : (
                  <Image
                    source={require("./assets/images/defaultUserImage.jpg")}
                    className="w-[150px] h-[150px] rounded-full"
                  />
                )}
              </View>
              <Text className="text-lg font-semibold">
                {profile ? profile?.userName : "no login"}
              </Text>
            </View>
            <DrawerItemList {...props} />
          </View>
        );
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondColor, // Change header background color
          elevation: 0,
          borderBottomWidth: 0, // Remove bottom border
          shadowColor: "transparent", // Remove shadow
        },
        headerTintColor: "black", // Change text color of header titles
        drawerActiveTintColor: colors.secondColor,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={{ paddingRight: 16 }}
          >
            <MagnifyingGlassIcon size={24} color={"black"} />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        options={{
          drawerLabel: "Home",
          title: "PScore",
          drawerIcon: () => <HomeIconLine color={colors.secondColor} />,
        }}
        component={MyTabs}
      />

      {(profile.userType == "manager" || profile.userType == "player") && (
        <Drawer.Screen
          name="Notifications"
          options={{
            drawerIcon: () => <BellAlertIconLine color={colors.secondColor} />,
          }}
          component={Notifications}
        />
      )}

      {profile.userType == "manager" && (
        <Drawer.Screen
          name="MyGames"
          options={{
            drawerIcon: () => (
              <ArchiveBoxArrowDownIconLine color={colors.secondColor} />
            ),
          }}
          component={MyGames}
        />
      )}
      {profile.userType == "manager" && (
        <Drawer.Screen
          name="MyTeam"
          options={{
            drawerIcon: () => <UserGroupIcon color={colors.secondColor} />,
          }}
          component={MyTeam}
        />
      )}
      <Drawer.Screen
        name="MessagesScreen"
        options={{
          drawerLabel: "Messages",
          title: "Messages",
          drawerIcon: () => (
            <ChatBubbleBottomCenterIcon color={colors.secondColor} />
          ),
        }}
        component={MessagesScreen}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          drawerIcon: () => <Cog6ToothIcon color={colors.secondColor} />,
        }}
        component={Settings}
      />
      <Drawer.Screen
        name="MapScreen"
        options={{
          drawerIcon: () => <MapIcon color={colors.secondColor} />,
        }}
        component={MapScreen}
      />
      <Drawer.Screen
        name="LogOut"
        options={{
          drawerIcon: () => (
            <ArrowLeftStartOnRectangleIcon color={colors.secondColor} />
          ),
        }}
        component={LogOut}
      />
    </Drawer.Navigator>
  );
}

const menuIcons = (focused, route, color, size) => {
  let icon;
  if (route.name == "hi") {
    icon = focused ? (
      <HomeSolid color={"#e0ac69"} size={40} />
    ) : (
      <HomeIcon color={"#ffdbac"} size={40} />
    );
  } else if (route.name == "Settings") {
    icon = focused ? (
      <HeartSolid color={"#e0ac69"} size={40} />
    ) : (
      <HeartIcon color={"#ffdbac"} size={40} />
    );
  }

  return (
    <View className={focused ? "rounded-full bg-white p-2" : ""}>{icon}</View>
  );
};
