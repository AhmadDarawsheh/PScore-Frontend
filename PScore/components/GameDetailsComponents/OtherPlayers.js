import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import DetailsTable from "../DetailsTable";
import Info from "../Info";
import { PlusIcon } from "react-native-heroicons/outline";
const PLAYEERS = [
  {
    id: 1,
    playername: "mohammad khaled",
    image: require("../../assets/images/players/ederson.png"),
  },
  {
    id: 2,
    playername: "Ahmad",
    image: require("../../assets/images/players/ederson.png"),
  },
  {
    id: 3,
    playername: "Aamer",
    image: require("../../assets/images/players/ederson.png"),
  },
  {
    id: 4,
    playername: "maen",
    image: require("../../assets/images/players/ederson.png"),
  },
  {
    id: 5,
    playername: "yaser",
    image: require("../../assets/images/players/ederson.png"),
  },
];
const OtherPlayers = ({ choosable, onPress, others }) => {
  return (
    <>
      <DetailsTable header={"OtherPlayers"}>
        {others.map((item) => (
          <Info key={item._id} item={item} first={item.playername} />
        ))}
        {choosable && <Plus onPress={onPress} />}
      </DetailsTable>
    </>
  );
};

const Plus = ({ onPress }) => {
  return (
    <TouchableOpacity className="flex items-center" onPress={onPress}>
      <PlusIcon size={48} color={"black"} />
    </TouchableOpacity>
  );
};

export default OtherPlayers;
