import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import React, { createRef, useEffect, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CalendarDaysIcon, CalendarIcon } from "react-native-heroicons/outline";
import colors from "../assets/colors/colors";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";

const DATA = [
  {
    id: "1",
    date: "2024-04-26",
  },
  {
    id: "2",
    date: "2024-04-24",
  },
  {
    id: "3",
    title: "yesterday",
    date: "2024-04-26",
  },
  {
    id: "4",
    title: "today",
    date: "2024-04-26",
  },
  {
    id: "5",
    title: "tomorrow",
    date: "2024-04-26",
  },
  {
    id: "6",
    date: "2024-04-26",
  },
  {
    id: "7",
    date: "2024-04-26",
  },
];

const DayPicker = ({ day, setDay }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [index, setIndex] = useState(3);
  const [isFlatListReady, setFlatListReady] = useState(false);
  const [chooseDay, setChooseDay] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const handleDayPress = (date) => {
    setSelectedDate(date.dateString);
    setDay(date.dateString);
    setModalVisible(false);
    console.log(date);
  };
  useEffect(() => {
    console.log(day);
  }, [day]);
  useEffect(() => {
    if (isFlatListReady) {
      // Scroll to index 3 when the FlatList is ready
      if (listViewRef) {
        listViewRef.scrollToIndex({
          index: 3,
          animated: false,
          viewPosition: 0.5,
        });
      }
    }
  }, [isFlatListReady]);
  useEffect(() => {
    const todayDate = dayjs().format("YYYY-MM-DD");
    DATA[3].date = todayDate;

    const currentDate = dayjs();

    const yesterdayDate = currentDate.subtract(1, "day");
    DATA[2].date = yesterdayDate.format("YYYY-MM-DD");

    const yesterday2Date = currentDate.subtract(2, "day");
    DATA[1].date = yesterday2Date.format("YYYY-MM-DD");

    const yesterday3Date = currentDate.subtract(3, "day");
    DATA[0].date = yesterday3Date.format("YYYY-MM-DD");

    const tomorrowDate = currentDate.add(1, "day");
    DATA[4].date = tomorrowDate.format("YYYY-MM-DD");

    const tomorrow2Date = currentDate.add(2, "day");
    DATA[5].date = tomorrow2Date.format("YYYY-MM-DD");

    const tomorrow3Date = currentDate.add(3, "day");
    DATA[6].date = tomorrow3Date.format("YYYY-MM-DD");
  }, []);
  return (
    <View className="flex-row items-center justify-center ">
      <View className=" ">
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View className="w-full h-full flex items-center justify-center">
                <Calendar
                  onDayPress={handleDayPress}
                  markedDates={{
                    [day]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: colors.secondColor,
                    },
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity className="p-2" onPress={() => setModalVisible(true)}>
        <CalendarDaysIcon color={colors.mainColor} />
      </TouchableOpacity>
      <View style={{ width: 300, height: 50 }}>
        <FlatList
          ref={(ref) => (listViewRef = ref)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 10,
          }}
          horizontal
          data={DATA}
          // onScroll={(event) => {
          //   console.log(event.nativeEvent.contentOffset.x);
          // }}
          onScrollToIndexFailed={() => {}}
          renderItem={({ item, index }) => (
            <Item
              chooseDay={chooseDay}
              setChooseDay={setChooseDay}
              setDay={setDay}
              item={item}
              index={index}
            />
          )}
          onLayout={() => {
            setFlatListReady(true);
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <TouchableOpacity
        className="p-1 flex items-center"
        onPress={() => {
          if (listViewRef) {
            listViewRef.scrollToIndex({
              index: 3,
              animated: true,
              viewPosition: 0.5,
            });
          }
        }}
      >
        <CalendarIcon color={colors.mainColor} />
        <Text>today</Text>
      </TouchableOpacity>
    </View>
  );
};
const Item = ({ item, index, chooseDay, setChooseDay, setDay }) => {
  const bgColor = chooseDay == item.id ? colors.mainColor : colors.secondColor;
  const opacity = chooseDay == item.id ? 1 : 0.6;
  return (
    <Pressable
      className={"flex items-center px-2 py-1 rounded-xl mx-1"}
      style={{
        width: 100,
        backgroundColor: bgColor,
      }}
      onPress={() => {
        setChooseDay(item.id);
        setDay(item.date);
        if (listViewRef) {
          listViewRef.scrollToIndex({
            index: index,
            animated: true,
            viewPosition: 0.5,
          });
        }
      }}
    >
      <Text style={{ color: colors.myWhite, opacity: opacity }}>
        {item.title ? item.title : item.date}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value for transparency
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    height: 600,
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

export default DayPicker;
