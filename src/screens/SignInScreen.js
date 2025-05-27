//SignInScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import axios from "axios";

import { color } from "../constants";
import { Button, LoaderScreen, showToast, TextField } from "../components";
import { userLogin } from "../redux/slices";
import Config from "../config/Config";

export const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const checkErrors = () => {
    let newError = {};
    if (!inputFields?.email) {
      newError.email = "Please enter email";
    }
    if (!inputFields.password) {
      newError.password = "Please enter password";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };
  const clearFields = () => {
    setInputFields({
      email: "",
      password: "",
    });
    setError(null);
  };

  const signInUser = async () => {
    if (!checkErrors()) {
      return;
    }
    setLoading(true);
    const data = {
      email: inputFields?.email,
      password: inputFields?.password,
    };
    try {
      const options = {
        url: `${Config.BASE_URL}/users/signin`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      };
      const response = await axios(options);
      if (response.data.status === 'error') {
        showToast({
          type: "error",
          text1: response.data.message,
        });
      } else {
        showToast({
          type: "success",
          text1: 'Successfully Logged In',
        });
        dispatch(userLogin(response.data));
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
  };

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <View style={styles.mainView}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <KeyboardAvoidingView
        style={{ flex: 2 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={require("../../assets/images/SignInBgImage.png")}
          style={styles.bgImage}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity style={styles.backIconView}>
              <Ionicons name="chevron-back" size={30} color={color.white} />
            </TouchableOpacity>
            <View style={styles.topView}>
              <Text style={styles.headerText}>Sign In</Text>
              <Text style={styles.bodyText}>
                Welcome Back! Please sign in to your account to continue.
              </Text>
            </View>
            <View style={styles.middleView}>
              <View style={styles.formView}>
                <TextField
                  label="Email"
                  value={inputFields?.email}
                  onChangeText={(txt) =>
                    setInputFields((prev) => ({
                      ...prev,
                      email: txt,
                    }))
                  }
                  autoCapitalize="none"
                  error={error?.email}
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
                <Button btnLabel="Sign In" onPress={signInUser} />
                <Button
                  btnLabel="Clear"
                  onPress={clearFields}
                  btnStyle={{ backgroundColor: color.primary, borderWidth: 1, borderColor: color.borderColor }}
                  textStyle={{ color: color.error }}
                />
              </View>
            </View>
            <View style={styles.bottomView}>
              <Text style={styles.linkText}>Don't have an account? </Text>
              <TouchableOpacity
                style={styles.signUpView}
                onPress={() => navigation.navigate("signUpScreen")}
              >
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
              <View style={styles.horizontalLine} />
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.white,
  },
  bgImage: {
    flex: 1,
    width: "100%",
    height: Dimensions.get("window").height,
  },
  backIconView: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight + 10,
    paddingLeft: 20,
    marginBottom: 40,
  },
  topView: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  headerText: {
    fontSize: 52,
    color: color.white,
    fontFamily: "mnstBold",
  },
  bodyText: {
    fontSize: 22,
    color: color.white,
    fontFamily: "mnstRegular",
  },
  middleView: {
    marginTop: 100,
    marginHorizontal: 20,
  },
  formView: {
    marginTop: 30,
    gap: 20,
  },
  bottomView: {
    marginTop: 20,
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
  },
  linkText: {
    fontSize: 22,
    color: color.black,
    fontFamily: "mnstRegular",
  },
  signUpView: {
    zIndex: 2,
  },
  signUpText: {
    fontSize: 20,
    color: color.black,
    fontFamily: "mnstBlack",
  },
  horizontalLine: {
    width: 70,
    height: 7,
    backgroundColor: color.secondary,
    position: "absolute",
    right: 0,
    bottom: 5,
    zIndex: 1,
  },
});
