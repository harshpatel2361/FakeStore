import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { color } from "../constants";

export const TextField = ({
  style,
  label,
  value,
  onBlur,
  onFocus,
  error,
  onChangeText,
  multiline,
  keyboardType,
  secureTextEntry,
  showRightIcon,
  renderRightIcon,
  rightIconPress,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused, value]);

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View>
        <View
          style={[
            style,
            styles.mainTextInputView,
            error && { borderColor: color.error, borderWidth: 2 },
            isFocused && { borderColor: color.black, borderWidth: 2 },
          ]}
        >
          <TextInput
            {...props}
            ref={inputRef}
            style={styles.textInputStyle}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
          />
          {showRightIcon && (
            <TouchableOpacity style={styles.iconView} onPress={rightIconPress}>
              {renderRightIcon()}
            </TouchableOpacity>
          )}
        </View>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, -13],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10],
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.label,
              {
                fontSize: isFocused ? 18 : 20,
              },
              error && { color: color.error },
            ]}
          >
            {label}
          </Animated.Text>
        </Animated.View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainTextInputView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 20,
    height: 60,
  },
  textInputStyle: {
    padding: 0,
    fontFamily: "mnstMedium",
    fontSize: 20,
    flex: 1,
    borderWidth: 0,
    paddingLeft: 30,
  },
  iconView: {
    height: "100%",
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    position: "absolute",
    left: 25,
    backgroundColor: color.white,
    paddingHorizontal: 8,
  },
  label: {
    fontFamily: "mnstMedium",
    letterSpacing: 0.5,
  },
  errorText: {
    paddingHorizontal: 25,
    marginTop: 3,
    fontSize: 16,
    color: color.error,
  },
});
