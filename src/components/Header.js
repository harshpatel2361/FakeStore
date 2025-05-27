import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { color } from "../constants";

export const Header = ({
  headerWithTitle,
  headerTitle,
  headerTitleTextCustomStyle,
  leftIcon,
  leftIconPress,
  headerStyle,
  headerLeftIcon,
  headerRightIcon,
  headerTitleView,
  rightIcon,
  rightIconPress,
  title,
}) => {
  return (
    <View style={[styles.rootContainer, headerStyle]}>
      {!leftIcon ? null : (
        <TouchableOpacity onPress={leftIconPress} style={styles.headerLeftIcon}>
          {headerLeftIcon()}
        </TouchableOpacity>
      )}
      {title ? (
        <View style={[styles.titleContainer, headerTitleView]}>
          {headerWithTitle && (
            <Text
              style={[styles.headerTitleTextStyle, headerTitleTextCustomStyle]}
            >
              {headerTitle}
            </Text>
          )}
        </View>
      ) : null}
      {!rightIcon ? null : (
        <TouchableOpacity
          onPress={rightIconPress}
          style={styles.headerRightIcon}
        >
          {headerRightIcon()}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: color.secondary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    elevation: 10,
    zIndex: 1,
    shadowColor: color.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLeftIcon: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "50",
    position: "absolute",
    left: 0,
  },
  headerRightIcon: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "50",
    position: "absolute",
    right: 0,
  },
  headerTitleTextStyle: {
    color: color.textColor,
    fontSize: 30,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: 'mnstSemiBold'
  },
});
