import {
  View,
  Text,
  Dimensions,
  Button,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import dayjs from "dayjs";
import {
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import MyTextInput from "../../components/MyTextInput";

import SelectDropdown from "react-native-select-dropdown";
import colors from "../../assets/colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import AuthContext, { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
const positions = [
  { title: "striker", icon: "emoticon-happy-outline" },
  { title: "goalkeeper", icon: "emoticon-cool-outline" },
  { title: "mid", icon: "emoticon-lol-outline" },
  { title: "defend", icon: "emoticon-lol-outline" },
];
const countries = [
  { countryName: "Palestine", icon: "https://flagsapi.com/PS/flat/64.png" },
  { countryName: "Jordan", icon: "https://flagsapi.com/JO/flat/64.png" },
];
const width = Dimensions.get("window").width;
export default Settings = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const pickImage = async () => {
    // Ask for permission to access media library
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    // Open image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const { profile, setProfile, token } = useAuth();
  const updateProfile = async (values) => {
    console.log("hello token");
    console.log(profile.number);
    if (token) {
      try {
        if (
          image ||
          profile.number != values.number ||
          profile.position != values.position ||
          profile.country != values.country
        ) {
          setIsLoading(true);
          const formData = new FormData();
          const file = {
            uri: image,
            type: "image/jpeg", // Assuming jpeg, update accordingly if different
            name: "photo.jpg", // Update the name as per your requirements
          };
          if (image) {
            formData.append("image", file);
            setProfile((prevProfile) => ({
              ...prevProfile,
              image: image,
            }));
          }
          const additionalData = {};

          // Conditionally add key-value pairs
          if (values.number !== "" || profile.number != values.number) {
            additionalData.number = values.number;
            setProfile((prevProfile) => ({
              ...prevProfile,
              number: values.number,
            }));
          }
          if (values.country != "" || profile.country != values.country) {
            additionalData.country = values.country;
            setProfile((prevProfile) => ({
              ...prevProfile,
              country: values.country,
            }));
          }
          if (profile.userType == "player") {
            if (values.position != "" || profile.position != values.position) {
              additionalData.position = values.position;
              setProfile((prevProfile) => ({
                ...prevProfile,
                position: values.position,
              }));
            }
          }

          // Loop through additionalData object and append each key-value pair to formData
          for (const key in additionalData) {
            formData.append(key, additionalData[key]);
          }
          const response = await axios.post(
            "https://pscore-backend.vercel.app/profile/create",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Ahmad__${token}`,
              },
            }
          );

          console.log(response.data);
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
        console.error("Error config:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Token is not defined");
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex items-center justify-center mt-6">
        <TouchableOpacity
          onPress={pickImage}
          className="relative rounded-full border "
          style={{ backgroundColor: colors.mainColor }}
        >
          <Image
            source={
              image
                ? { uri: image }
                : profile?.image
                ? { uri: profile?.image }
                : require("../../assets/images/defaultUserImage.jpg")
            }
            className="w-[150px] h-[150px] rounded-full"
          />

          <View className="absolute top-0 right-0 bg-white rounded-full p-1">
            <CameraIcon size={30} color={"black"} />
          </View>
        </TouchableOpacity>

        <MyTextInput
          Icon={UserIcon}
          placeholder={"userName"}
          label={"UserName"}
          value={profile ? profile.userName : ""}
          editable={false}
        />
        <MyTextInput
          Icon={EnvelopeIcon}
          placeholder={"email"}
          label={"email"}
          value={profile ? profile.email : ""}
          editable={false}
        />
        <Formik
          initialValues={{
            country: profile ? profile.country : "",
            number: profile ? profile.number : "",
            position: profile ? profile.position : "",
          }}
          onSubmit={(values) => updateProfile(values, image)}
        >
          {({
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
          }) => (
            <View>
              <MyTextInput
                Icon={PhoneIcon}
                placeholder={"number"}
                label={"number"}
                onChangeText={handleChange("number")}
                onBlur={handleBlur("number")}
                value={values.number ? values.number : ""}
              />
              {profile.userType == "player" && (
                <View className="mt-6 w-[300px]">
                  <Text>position</Text>
                  <SelectDropdown
                    data={positions}
                    onSelect={(selectedItem, index) => {
                      setFieldValue("position", selectedItem.title);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text className="font-medium text-lg">
                            {(selectedItem && selectedItem.title) ||
                              (profile.position && profile.position)}
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
                          <Text style={styles.dropdownItemTxtStyle}>
                            {item.title}
                          </Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                </View>
              )}

              <View className="mt-6 w-[300px]">
                <Text>select country</Text>
                <SelectDropdown
                  data={countries}
                  onSelect={(selectedItem, index) => {
                    setFieldValue("country", selectedItem.countryName);
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        <Text className="font-medium text-lg">
                          {(selectedItem && selectedItem.countryName) ||
                            (profile.country && profile.country)}
                        </Text>
                        <Image
                          style={{
                            width: 25,
                            height: 25,
                            resizeMode: "cover",
                          }}
                          source={{ uri: selectedItem?.icon }}
                        />
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
                        <Text style={styles.dropdownItemTxtStyle}>
                          {item.countryName}
                        </Text>
                        <Image
                          style={{
                            width: 25,
                            height: 25,
                            resizeMode: "cover",
                          }}
                          source={{ uri: item.icon }}
                        />
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              </View>
              <View className="flex items-center">
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="bg-green-400 px-8 py-2 rounded-md mt-6"
                >
                  {isLoading ? (
                    <ActivityIndicator color={colors.mainColor} />
                  ) : (
                    <Text>save</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* <Button onPress={handleSubmit} title="Submit" /> */}
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
