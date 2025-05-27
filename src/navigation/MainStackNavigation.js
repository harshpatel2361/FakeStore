import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import {
  ProductDetailScreen,
  ProductListScreen,
  SplashScreen,
  UpdateProfileScreen,
} from "../screens";
import { BottomStackNavigation } from "./BottomStackNavigation";
import { AuthStackNavigation } from "./AuthStackNavigation";

const Stack = createNativeStackNavigator();

export const MainStackNavigation = () => {
  const { userDetails } = useSelector((state) => state?.auth);
  const [showSplashScreen, setHideSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {showSplashScreen && (
          <Stack.Screen component={SplashScreen} name="splashScreen" />
        )}
        {/* {userDetails ? ( */}
          <Stack.Screen
            name="bottomStackNavigation"
            component={BottomStackNavigation}
          />
        {/* ) : (
          <Stack.Screen
            name="authStackNavigation"
            component={AuthStackNavigation}
          />
        )} */}
        <Stack.Screen name="productListScreen" component={ProductListScreen} />
        <Stack.Screen
          name="productDetailScreen"
          component={ProductDetailScreen}
        />
        <Stack.Screen
          name="updateProfileScreen"
          component={UpdateProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
