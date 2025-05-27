import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

import { color } from "../constants";
import { Button, Header, showToast, TextField } from "../components";
import { updateProfile } from "../redux/slices";
import Config from "../config/Config";

export const UpdateProfileScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userDetails} = useSelector(state => state?.auth);

  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFields] = useState({
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const checkErrors = () => {
    let newError = {};
    if (!inputFields?.name) {
      newError.name = "Please enter name";
    }
    if (!inputFields.password) {
      newError.password = "Please enter password";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };


  const updateUserDetails = async () => {
    if (!checkErrors()) {
      return;
    }
    setLoading(true);
    const data = {
      name: inputFields?.name,
      password: inputFields?.password,
    };
    try {
      const options = {
        url: `${Config.BASE_URL}/users/update`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userDetails?.token}`,
        },
        data: JSON.stringify(data),
      };
      const response = await axios(options);
      if (response.data.status === 'error') {
        showToast({
          type: "error",
          text1: response.data.status,
          text2: response.data.message,
        });
      } else {
        showToast({
          type: "success",
          text1: response.data.message,
        });
        const filedToUpdate = {
          name: response.data.name
        }
        dispatch(updateProfile(filedToUpdate));
        navigation.goBack()
      }
    } catch (error) {
      console.log("Error logging in: ", error);
      showToast({
        type: "error",
        text1: "Sign In Failed",
        text2: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.mainView}>
      <StatusBar translucent={false} backgroundColor={color.secondary} barStyle="dark-content" />
      <Header
        title
        headerWithTitle
        headerTitle="Update Profile"
        leftIcon
        headerLeftIcon={() => (
          <Ionicons name="arrow-back-outline" size={30} color={color.primary} />
        )}
        leftIconPress={() => navigation.goBack()}
      />
      <View style={styles.middleView}>
        <View style={styles.formView}>
          <TextField
            label="Name"
            value={inputFields?.name}
            onChangeText={(txt) =>
              setInputFields((prev) => ({
                ...prev,
                name: txt,
              }))
            }
            autoCapitalize="none"
            error={error?.name}
          />
          <TextField
            label="Password"
            value={inputFields?.password}
            onChangeText={(txt) =>
              setInputFields((prev) => ({
                ...prev,
                password: txt,
              }))
            }
            autoCapitalize="none"
            secureTextEntry={showPassword}
            showRightIcon={true}
            renderRightIcon={() => (
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={30}
                color={color.error}
              />
            )}
            rightIconPress={() => setShowPassword((prev) => !prev)}
            error={error?.password}
          />
          <Button btnLabel="Update" onPress={updateUserDetails} />
          <Button
            btnLabel="Cancel"
            onPress={() => navigation.goBack()}
            btnStyle={{ backgroundColor: color.primary, borderWidth: 1, borderColor: color.borderColor }}
            textStyle={{ color: color.error }}
          />


        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.white,
  },

  middleView: {
    marginTop: 100,
    marginHorizontal: 20,
  },
  formView: {
    marginTop: 30,
    gap: 20,
  },
});
