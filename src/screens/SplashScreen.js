import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import React from "react";
import { color } from "../constants";

export const SplashScreen = () => {
  return (
    <View style={styles.mainView}>
      <StatusBar barStyle='dark-content' backgroundColor={color.white} />
      <View style={styles.splashImage}>
        <Image
          source={require("../../assets/images/splashScreenImage.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.white
  },
  splashImage: {
    width: 300,
    height: 300,
    objectFit: "contain",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
