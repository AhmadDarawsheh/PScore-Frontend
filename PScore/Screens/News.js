import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Header from "../components/Header.js";
import NewsCard from "../components/NewsCard.js";
import { useEffect } from "react";

import axios from "axios";
const colors = require("../assets/colors/colors.js");
const DATA = [
  {
    id: 1,
    title: "Lorem Ipsum Dolor Sit Amet",
    category: "Technology",
    date: "March 10, 2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et odio sit amet ipsum accumsan eleifend ut in ligula.",
  },
  {
    id: 2,
    title: "Nulla Ullamcorper Massa Quis Luctus Lacinia",
    category: "Politics",
    date: "March 9, 2024",
    content:
      "Nulla ullamcorper massa quis luctus lacinia. Integer eu felis eget justo facilisis tempor nec et sem.",
  },
  {
    id: 3,
    title: "Vivamus At Sapien Molestie",
    category: "Entertainment",
    date: "March 8, 2024",
    content:
      "Vivamus at sapien molestie, interdum velit a, molestie elit. Sed ultricies, mi et ultrices lobortis, libero arcu tincidunt dui, sit amet molestie nulla nulla non mauris.",
  },
];

const News = () => {
  const [news, setNews] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      console.log("hello token");
      try {
        const response = await axios.get(
          "https://pscore-backend.vercel.app/news",
          {}
        );
        console.log(response.data);
        setNews(response.data.news);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={news}
        renderItem={({ item }) => <NewsCard key={item._id} item={item} />}
        keyExtractor={(item) => item._id}
        ListFooterComponent={renderFooter} // Render your footer component
      />
    </View>
  );
};
const renderFooter = () => (
  <View style={{ paddingBottom: 90, paddingTop: 10 }}>
    <TouchableOpacity>
      <ActivityIndicator size="large" color={colors.mainColor} />
    </TouchableOpacity>
  </View>
);
export default News;
