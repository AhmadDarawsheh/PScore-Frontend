import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import colors from "../assets/colors/colors";
import { Formik } from "formik";
import MyTextInput from "../components/MyTextInput";
import { EnvelopeIcon, LockClosedIcon } from "react-native-heroicons/outline";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import Line from "../components/Line";
import axios from "axios";
import AuthContext, { useAuth } from "../contexts/AuthContext";
import { useChats } from "../contexts/ChatsContext";
const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [loginText, setLoginText] = useState("");
  const [loginTextColor, setLoginTextColor] = useState();
  const { setToken } = useAuth();
  const { setUser } = useChats();

  const handleLogin = async (values, resetForm) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://pscore-backend.vercel.app/auth/signin",
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response?.data?.message === "success") {
        resetForm();
        setLoginText("login Sccess");
        setLoginTextColor("green");
        setToken(response?.data?.token);
        setUser(values.email);
        navigation.navigate("MainPage");
      } else {
        console.log("no login:", response.data);

        setLoginText(response?.data?.message);
        setLoginTextColor("red");
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
        onPress={() => navigation.navigate("Welcome")}
      >
        <ChevronLeftIcon color={colors.mainColor} size={40} />
      </TouchableOpacity>
      <View className="mb-10">
        <Text
          className="text-white text-6xl "
          style={{ color: colors.secondColor }}
        >
          <Text style={{ color: colors.mainColor }}>PS</Text>core
        </Text>
      </View>
      {/*user Name*/}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values, resetForm);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <MyTextInput
              Icon={EnvelopeIcon}
              placeholder={"example@gmail.com"}
              label={"email"}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
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

            <Text
              style={{
                marginTop: 32,
                textAlign: "center",
                color: loginTextColor,
              }}
            >
              {loginText}
            </Text>
            <TouchableOpacity
              onPress={handleSubmit}
              className="px-14 py-5 rounded-xl flex mt-1 items-center"
              style={{ backgroundColor: colors.mainColor, width: 300 }}
            >
              {loading ? (
                <ActivityIndicator color={colors.secondColor} />
              ) : (
                <Text style={{ color: colors.secondColor }}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <Line />
      <View className="flex-row mt-2">
        <Text style={{ color: colors.mainColor }}>dont have account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ color: colors.secondColor }}>SignUp</Text>
        </TouchableOpacity>
      </View>
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
});

export default Login;
