import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Header,
  LoaderScreen,
  ProductCard,
  showToast,
} from "../components";
import { color } from "../constants";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/slices/CartSlice";
import axios from "axios";
import Config from "../config/Config";
import { addOrder } from "../redux/slices/OrderSlice";

export const CartScreen = () => {
  const navigation = useNavigation();
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state?.cart
  );
  const { userDetails } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showCartItems, setShowCartItems] = useState(false);

  const fetchCartItemsFromServer = async () => {
    setLoading(true);
    try {
      const options = {
        url: `${Config.BASE_URL}/cart`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails?.token}`,
        },
      };
      const response = await axios(options);
      if (response?.data.status == "error") {
        setShowCartItems(false);
        showToast({
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      } else {
        setShowCartItems(true);
      }
    } catch (error) {
      console.log("Error fetching cart items from server:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutButton = async () => {
    setLoading(true);
    const simpliedItems = cartItems?.map((item) => ({
      prodID: item?.id,
      price: item?.price,
      quantity: item?.quantity,
    }));
    try {
      const options = {
        url: `${Config.BASE_URL}/orders/newOrder`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails?.token}`,
        },
        data: {
          items: simpliedItems,
        },
      };
      const response = await axios(options);
      if (response.data.status === "OK") {
        dispatch(addOrder(cartItems));
        dispatch(clearCart());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "categoryListScreen",
              },
            ],
          })
        );
      } else {
        showToast({
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      }
    } catch (error) {
      console.log("error in add new orders items: ", error);
      dispatch(addOrder(cartItems));
      dispatch(clearCart());
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "categoryListScreen",
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCartItems = (item) => {
    const data = item?.item;
    return (
      <ProductCard
        activeOpacity={1}
        productTitle={data?.title}
        imageURI={data?.image}
        productPrice={data?.price}
        showQuantityView
        productQuantity={data?.quantity}
        onIncrementPress={() => handleIncrementPress(data?.id)}
        onDecrementPress={() => handleDecrementPress(data?.id)}
      />
    );
  };

  const handleIncrementPress = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementPress = (id) => {
    dispatch(decrementQuantity(id));
  };

  useEffect(() => {
    fetchCartItemsFromServer();
  }, []);

  return (
    <View style={styles.mainView}>
      <StatusBar
        translucent={false}
        backgroundColor={color.secondary}
        barStyle="dark-content"
      />
      <Header title headerWithTitle headerTitle="Shopping Cart" />
      {loading ? (
        <LoaderScreen />
      ) : (
        <>
          {showCartItems && cartItems?.length > 0 && (
            <View style={styles.topView}>
              <Text style={styles.bodyText}>Items: {totalQuantity}</Text>
              <Text style={styles.bodyText}>
                Total Price: $ {totalPrice.toFixed(2)}
              </Text>
            </View>
          )}
          <View style={styles.productContainer}>
            {showCartItems && cartItems?.length > 0 ? (
              <FlatList
                contentContainerStyle={styles.scrollContainer}
                keyExtractor={(item) => item?.id}
                data={cartItems}
                renderItem={renderCartItems}
              />
            ) : (
              <View style={styles.emptyView}>
                <Text style={styles.emptyViewText}>Your cart is empty</Text>
              </View>
            )}
          </View>
          {showCartItems && cartItems?.length > 0 && (
            <View style={styles.bottomView}>
              <Button btnLabel="Checkout" onPress={handleCheckoutButton} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  topView: {
    margin: 20,
    backgroundColor: color.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  bodyText: {
    color: color.white,
    fontSize: 20,
    fontFamily: "mnstSemiBold",
  },
  productContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    gap: 20,
    paddingHorizontal: 20,
  },
  emptyView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyViewText: {
    color: color.primary,
    fontSize: 30,
    fontFamily: "mnstBlack",
    textTransform: "capitalize",
    letterSpacing: 0.5,
  },
  bottomView: {
    padding: 20,
  },
});
