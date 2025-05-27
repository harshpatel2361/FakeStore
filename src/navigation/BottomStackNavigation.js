import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CartScreen,
  CategoryListScreen,
  OrdersScreen,
  UserProfileScreen,
} from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { color } from "../constants";
import { useSelector } from "react-redux";
import { AuthStackNavigation } from "./AuthStackNavigation";
import { Alert, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export const BottomStackNavigation = () => {
  const { userDetails } = useSelector((state) => state?.auth);
  const { totalQuantity } = useSelector((state) => state?.cart);
  const { orders } = useSelector((state) => state?.orders);

  const ProtectedTabBarButton = (props) => {
    const { onPress, children } = props;
    return (
      <TouchableOpacity
        {...props}
        onPress={() => {
          if (!userDetails) {
            Alert.alert(
              "Sign In Required",
              "Please sign in to access this section."
            );
          } else {
            onPress();
          }
        }}
      >
        {children}
      </TouchableOpacity>
    );
  };
  return (
    <Tab.Navigator
      initialRouteName={userDetails?"categoryListScreen":"authStackNavigation"}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarActiveBackgroundColor: color.secondary,
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 18,
          color: color.primary,
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="categoryListScreen"
        component={CategoryListScreen}
        options={{
          tabBarIcon: (props) => (
            <Ionicons name="home" size={30} color={color.primary} />
          ),
          tabBarLabel: "Products",
          tabBarButton: (props) => <ProtectedTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="cartScreen"
        component={CartScreen}
        options={{
          tabBarIcon: (props) => (
            <Ionicons name="cart-outline" size={30} color={color.primary} />
          ),
          tabBarLabel: "My Cart",
          tabBarBadge: totalQuantity,
          tabBarBadgeStyle: {
            backgroundColor: color.error,
          },
          tabBarButton: (props) => <ProtectedTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="ordersScreen"
        component={OrdersScreen}
        options={{
          tabBarIcon: (props) => (
            <Ionicons name="gift" size={30} color={color.primary} />
          ),
          tabBarLabel: "My Orders",
          tabBarBadge: orders?.length,
          tabBarBadgeStyle: {
            backgroundColor: color.error,
          },
          tabBarButton: (props) => <ProtectedTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="authStackNavigation"
        component={AuthStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <Ionicons name="person" size={30} color={color.primary} />
          ),
          tabBarLabel: "User Profile",
          tabBarButton: (props) => <ProtectedTabBarButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};
