import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import colors from "../assets/colors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MyTextInput from "../components/MyTextInput";
import { LinearGradient } from "expo-linear-gradient";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  CalendarDaysIcon,
  UserGroupIcon,
} from "react-native-heroicons/outline";
import { BackwardIcon, ChevronLeftIcon } from "react-native-heroicons/solid";
import Line from "../components/Line";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import axios from "axios";

import { Formik } from "formik";
import SelectDropdown from "react-native-select-dropdown";
const userTypes = ["user", "player", "manager"];
const SignUp = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const [loading, setLoading] = useState(false);
  const [loginText, setLoginText] = useState("");
  const [loginTextColor, setLoginTextColor] = useState();
  const [userType, setUserType] = useState();
  const handleSignUP = async (values) => {
    setLoading(true); // Start loading
    console.log(values.birthDate);
    try {
      const response = await axios.post(
        "https://pscore-backend.vercel.app/auth/signup",
        {
          userName: values.userName,
          email: values.email,
          password: values.password,
          userType: values.userType,
          birthDate: values.birthDate,
        }
      );
      if (response?.data?.message === "success") {
        // setLoginText("sign up done");
        // setLoginTextColor("green");

        console.log("sign up done", response.data);
        navigation.navigate("Login");
      } else {
        console.log("no sign up:", response.data);

        // setLoginText(response?.data?.message);
        // setLoginTextColor("red");
      }

      // Handle successful login here (e.g., navigate to another screen)
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error here (e.g., show error message)
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <View className="flex-1 justify-center items-center relative">
      <TouchableOpacity
        className="absolute top-0 left-0 mt-8 ml-5 p-1 rounded-full"
        style={{ backgroundColor: colors.lightGreen }}
        onPress={() => navigation.navigate("MainPage")}
      >
        <ChevronLeftIcon color={colors.mainColor} size={40} />
      </TouchableOpacity>
      <View className="mt-[100px]">
        <Text
          className="text-white text-6xl "
          style={{ color: colors.secondColor }}
        >
          <Text style={{ color: colors.mainColor }}>PS</Text>core
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*user Name*/}
        <Formik
          initialValues={{
            userName: "",
            email: "",
            userType: "",
            birthDate: "",
            password: "",
          }}
          onSubmit={(values) => handleSignUP(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
          }) => (
            <View>
              <MyTextInput
                Icon={UserIcon}
                placeholder={"userName"}
                label={"UserName"}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                value={values.userName}
              />
              <MyTextInput
                Icon={EnvelopeIcon}
                placeholder={"Moh@outlook.com"}
                label={"Email"}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <View className="mt-6 w-[300px]">
                <Text>userType</Text>
                <SelectDropdown
                  data={userTypes}
                  onSelect={(selectedItem, index) => {
                    setFieldValue("userType", selectedItem);
                    setUserType(selectedItem); // Update Formik state
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        <Text className=" text-lg">
                          {(selectedItem && selectedItem) ||
                            "Select user typer"}
                        </Text>
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                          ...(isSelected && { backgroundColor: "#D2D9DF" }),
                        }}
                      >
                        <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              </View>

              {/*date*/}
              <MyTextInput
                Icon={CalendarDaysIcon}
                placeholder="date of birth"
                label="date of birth"
                isDate={true}
                showDatePicker={showDatePicker}
                dateText={dayjs(date).format("YYYY-MM-DD")}
                onChangeText={() => console.log(date)}
                onBlur={handleBlur("birthDate")}
                value={values.birthDate}
              />
              {/*password*/}

              <MyTextInput
                Icon={LockClosedIcon}
                placeholder={"*******"}
                label={"password"}
                password={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <MyTextInput
                Icon={LockClosedIcon}
                placeholder={"*******"}
                label={"conform password"}
                password={true}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                className="px-14 py-5 rounded-xl mt-8 flex items-center"
                style={{ backgroundColor: colors.mainColor, width: 300 }}
              >
                {loading ? (
                  <ActivityIndicator color={colors.secondColor} />
                ) : (
                  <Text style={{ color: colors.secondColor }}>SignUp</Text>
                )}
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={(event, selectedDate) => {
                    handleDateChange(event, selectedDate);
                    setFieldValue(
                      "birthDate",
                      dayjs(selectedDate).format("YYYY-MM-DD")
                    );
                  }}
                />
              )}
            </View>
          )}
        </Formik>
        {/*email*/}

        <Line />

        <View className="flex-row mt-2">
          <Text style={{ color: colors.mainColor }}>already have account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: colors.secondColor }}>login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 230,
  },
  box: {
    borderColor: colors.mainColor,
    borderWidth: 1,
    height: 60,
    width: 300,
  },
  dropdownButtonStyle: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: colors.mainColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default SignUp;
