import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import {
  SignInScreen,
  SignUpScreen,
  UpdateProfileScreen,
  UserProfileScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

export const AuthStackNavigation = () => {
  const { userDetails } = useSelector((state) => state?.auth);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {userDetails ? (
        <>
          <Stack.Screen
            component={UserProfileScreen}
            name="userProfileScreen"
          />
          <Stack.Screen
            component={UpdateProfileScreen}
            name="updateProfileScreen"
          />
        </>
      ) : (
        <>
          <Stack.Screen component={SignInScreen} name="signInScreen" />
          <Stack.Screen component={SignUpScreen} name="signUpScreen" />
        </>
      )}
    </Stack.Navigator>
  );
};
