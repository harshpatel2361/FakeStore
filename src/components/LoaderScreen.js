import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from "react-native";

import { color } from "../constants";

export const LoaderScreen = () => {
  return (
    <View style={styles.mainView}>
      <StatusBar
        translucent={false}
        backgroundColor={color.secondary}
        barStyle="dark-content"
      />
      <ActivityIndicator size="large" color={color.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1000
  },
});
