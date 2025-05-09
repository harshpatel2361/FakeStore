import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  ProductDetailScreen, ProductListScreen } from "../screens";
import { BottomStackNavigation } from "./BottomStackNavigation";

const Stack = createNativeStackNavigator();

export const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} >
        <Stack.Screen name="bottomStackNavigation" component={BottomStackNavigation} />
        <Stack.Screen name="productListScreen" component={ProductListScreen} />
        <Stack.Screen name="productDetailScreen" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}