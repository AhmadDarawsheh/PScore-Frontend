import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import colors from "../assets/colors/colors";
const MyTextInput = ({
  placeholder,
  label,
  Icon,
  password,
  onChangeText,
  onBlur,
  value,
  showDatePicker,
  isDate,
  dateText,
  setFieldValue,
  ...props
}) => {
  // useEffect(() => {
  //   console.log("sd");
  //   setFieldValue = { setFieldValue };
  // }, [dateText]);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="mt-6">
      <Text style={{ color: colors.mainColor }}>{label}</Text>
      <View className="flex-row items-center" style={styles.box}>
        <View className="mx-1">
          <Icon color={colors.mainColor} />
        </View>
        {!isDate && (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={password && !showPassword ? true : false}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            {...props}
          />
        )}
        {isDate && (
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={styles.input}
              placeholder={dateText}
              onChangeText={onChangeText}
              onBlur={onBlur}
              value={dateText}
              editable={false}
            />
          </TouchableOpacity>
        )}
        {/*for password*/}
        {password === true &&
          (() => {
            let icon = showPassword ? (
              <EyeIcon color={colors.mainColor} />
            ) : (
              <EyeSlashIcon color={colors.mainColor} />
            );

            return (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {icon}
              </TouchableOpacity>
            );
          })()}
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

export default MyTextInput;
