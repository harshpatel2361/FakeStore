import { useState } from "react";
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

import { userLogin } from "../redux/slices/AuthSlice";
import { color } from "../constants";
import { Button, LoaderScreen, showToast, TextField } from "../components";
import Config from "../config/Config";

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFields] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const checkErrors = () => {
    let newError = {};
    if (!inputFields?.email) {
      newError.email = "Please enter email";
    } else if (!emailRegex.test(inputFields?.email)) {
      newError.email = "your email should be example@gmail.com";
    }
    if (!inputFields?.username) {
      newError.username = "Please enter username";
    }
    if (!inputFields.password) {
      newError.password = "Please enter password";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };
  const clearFields = () => {
    setInputFields({
      username: "",
      email: "",
      password: "",
    });
    setError(null);
  };

  const signUpUser = async () => {
    if (!checkErrors()) {
      return;
    }
    setLoading(true);
    const data = {
      name: inputFields?.username,
      email: inputFields?.email,
      password: inputFields?.password,
    };
    try {
      const options = {
        url: `${Config.BASE_URL}/users/signup`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      };
      const response = await axios(options);
      console.log('res: ',response)
      if (response.data.status === 'error') {

        showToast({
          type: "error",
          text1: response.data.status,
          text2: response.data.message,
        });
      } else {
        showToast({
          type: "success",
          text1: 'Successfully Registered',
        });
        dispatch(userLogin(response.data));
      }
    } catch (error) {
      console.log("Error signing up in: ", error);
      showToast({
        type: "error",
        text1: "Sign Up Failed",
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
              <Text style={styles.headerText}>Sign Up</Text>
              <Text style={styles.bodyText}>
                Don't have an account? Sign up and get started.
              </Text>
            </View>
            <View style={styles.middleView}>
              <View style={styles.formView}>
                <TextField
                  label="Name"
                  value={inputFields?.username}
                  onChangeText={(txt) =>
                    setInputFields((prev) => ({
                      ...prev,
                      username: txt,
                    }))
                  }
                  autoCapitalize="none"
                  error={error?.username}
                />
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
                  keyboardType="email-address"
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
                <Button btnLabel="Sign Up" onPress={signUpUser} />
                <Button
                  btnLabel="Clear"
                  onPress={clearFields}
                  btnStyle={{ backgroundColor: color.primary, borderWidth: 1, borderColor: color.borderColor }}
                  textStyle={{ color: color.error }}
                />

              </View>
            </View>
            <View style={styles.bottomView}>
              <Text style={styles.linkText}>Already have an account?</Text>
              <TouchableOpacity
                style={styles.signUpView}
                onPress={() => navigation.navigate("signInScreen")}
              >
                <Text style={styles.signUpText}>Sign In</Text>
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
    width: 68,
    height: 7,
    backgroundColor: color.secondary,
    position: "absolute",
    right: 0,
    bottom: 5,
    zIndex: 1,
  },
});
