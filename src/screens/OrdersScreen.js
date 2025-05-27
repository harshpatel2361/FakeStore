import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import Config from "../config/Config";
import { color } from "../constants";
import { Header, LoaderScreen, showToast } from "../components";

export const OrdersScreen = () => {
  const navigation = useNavigation();
  const { orders } = useSelector((state) => state?.orders);
  const { userDetails } = useSelector((state) => state?.auth);
  const headerTabs = [
    {
      id: 1,
      text: "New Orders",
    },
    {
      id: 2,
      text: "Paid",
    },
    {
      id: 3,
      text: "Delivered",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [selectedHeaderTab, setSelectedHeaderTab] = useState(headerTabs[0]);
  const [orderItems, setOrderItems] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [paidOrders, setPaidOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const fetchOrderItemsFromServer = async () => {
    setLoading(true);
    try {
      const options = {
        url: `${Config.BASE_URL}/orders/all`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails?.token}`,
        },
      };
      const response = await axios(options);
      if (response?.data.status == "error") {
        showToast({
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      } else {
        const orders = response.data.orders;
        const newOrders = orders.filter(
          (oItem) => oItem.is_paid === 0 && oItem.is_delivered === 0
        );
        setOrderItems(newOrders);
        const filteredPaidOrders = orders.filter(
          (oItem) => oItem.is_paid === 1
        );
        setPaidOrders(filteredPaidOrders);
        const filtredDeliveredOrders = orders.filter(
          (oItem) => oItem.is_delivered === 1 && oItem.is_paid === 1
        );
        setDeliveredOrders(filtredDeliveredOrders);
      }
    } catch (error) {
      console.log("Error fetching order items from server:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderPayPress = async (item) => {
    setLoading(true);
    try {
      const options = {
        url: `${Config.BASE_URL}/orders/updateorder`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails?.token}`,
        },
        data: {
          orderID: item?.id,
          isPaid: 1,
          isDelivered: 0,
        },
      };
      const response = await axios(options);
      if (response?.data.status == "error") {
        showToast({
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      } else {
        fetchOrderItemsFromServer();
      }
    } catch (error) {
      console.log("Error fetching order items from server:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderReceivePress = async (item) => {
    setLoading(true);
    try {
      const options = {
        url: `${Config.BASE_URL}/orders/updateorder`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails?.token}`,
        },
        data: {
          orderID: item?.id,
          isPaid: 1,
          isDelivered: 1,
        },
      };
      const response = await axios(options);
      if (response?.data.status == "error") {
        showToast({
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      } else {
        fetchOrderItemsFromServer();
      }
    } catch (error) {
      console.log("Error fetching order items from server:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrderItemsFromServer();
    }, [])
  );

  return (
    <View style={styles.mainView}>
      <StatusBar
        translucent={false}
        backgroundColor={color.secondary}
        barStyle="dark-content"
      />
      <Header title headerWithTitle headerTitle="Orders" />
      {loading ? (
        <LoaderScreen />
      ) : (
        <View style={styles.mainView}>
          <View style={styles.subHeaderView}>
            {headerTabs.map((tab, index) => {
              const isSelected = selectedHeaderTab?.id === tab?.id;
              return (
                <TouchableOpacity
                  style={[
                    isSelected
                      ? { backgroundColor: color.secondary }
                      : { backgroundColor: color.primary },
                    styles.headerTabView,
                  ]}
                  key={tab?.id + index.toString()}
                  onPress={() => setSelectedHeaderTab(tab)}
                >
                  <Text
                    style={[
                      styles.subHeaderViewTitle,
                      isSelected && { color: color.primary },
                    ]}
                  >
                    {tab.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.middleView}>
            {selectedHeaderTab?.id === 1 &&
              (orderItems.length > 0 ? (
                <FlatList
                  keyExtractor={(item, index) => item?.id + index.toString()}
                  contentContainerStyle={styles.scrollStyle}
                  data={orderItems}
                  renderItem={({ item }) => {
                    const parsedOrderItems =
                      typeof item.order_items === "string"
                        ? JSON.parse(item.order_items)
                        : item.order_items;
                    return (
                      <View style={styles.orderOuterView}>
                        <TouchableOpacity
                          style={styles.orderHeader}
                          onPress={() =>
                            setExpanded(expanded === item?.id ? null : item?.id)
                          }
                        >
                          <Text style={styles.orderTitle}>Order {item?.id}</Text>
                          <View style={styles.row}>
                            {item?.is_delivered === 1 &&
                              item?.is_paid === 1 && (
                                <View style={styles.orderfullFilledView}>
                                  <Text style={styles.orderfullFilledViewText}>
                                    Order Fullfilled
                                  </Text>
                                </View>
                              )}
                            <Ionicons
                              name={
                                expanded === item?.id
                                  ? "chevron-up"
                                  : "chevron-down"
                              }
                              size={25}
                            />
                          </View>
                        </TouchableOpacity>
                        {expanded === item?.id && (
                          <View style={styles.orderBody}>
                            <FlatList
                              scrollEnabled={false}
                              keyExtractor={(item, index) =>
                                item?.prodID + index.toString()
                              }
                              data={parsedOrderItems}
                              renderItem={({ item }) => {
                                return (
                                  <View style={styles.orderItemWrapper}>
                                    <Text style={styles.productIdText}>
                                      ProductID: {item.prodID}
                                    </Text>
                                    <Text style={styles.bodyText}>
                                      Price: {item.price}
                                    </Text>
                                    <Text style={styles.bodyText}>
                                      Quantity: {item.quantity}
                                    </Text>
                                  </View>
                                );
                              }}
                            />
                            <View style={styles.orderStatusView}>
                              {item?.is_paid === 0 && (
                                <TouchableOpacity
                                  style={[
                                    styles.orderStatusPill,
                                    { backgroundColor: color.error },
                                  ]}
                                  onPress={() => handleOrderPayPress(item)}
                                >
                                  <Text style={styles.orderStatusPillText}>
                                    Pay
                                  </Text>
                                </TouchableOpacity>
                              )}
                              {item?.is_delivered === 0 && (
                                <TouchableOpacity
                                  style={[
                                    styles.orderStatusPill,
                                    { backgroundColor: color.success },
                                  ]}
                                  onPress={() => handleOrderReceivePress(item)}
                                >
                                  <Text style={styles.orderStatusPillText}>
                                    {item?.is_delivered === 0 && "Receive"}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  }}
                />
              ) : (
                <View style={styles.emptyView}>
                  <Text style={styles.emptyViewText}>
                    There are no records to display
                  </Text>
                </View>
              ))}
            {selectedHeaderTab?.id === 2 &&
              (paidOrders.length > 0 ? (
                <FlatList
                  keyExtractor={(item, index) => item.id + index.toString()}
                  contentContainerStyle={styles.scrollStyle}
                  data={paidOrders}
                  renderItem={({ item }) => {
                    const parsedOrderItems =
                      typeof item.order_items === "string"
                        ? JSON.parse(item.order_items)
                        : item.order_items;
                    return (
                      <View style={styles.orderOuterView}>
                        <TouchableOpacity
                          style={styles.orderHeader}
                          onPress={() =>
                            setExpanded(expanded === item?.id ? null : item?.id)
                          }
                        >
                          <Text style={styles.orderTitle}>
                            Order {item?.id}
                          </Text>
                          <View style={styles.row}>
                            {item?.is_paid === 1 && (
                              <View style={styles.orderfullFilledView}>
                                <Text style={styles.orderfullFilledViewText}>
                                  Paid
                                </Text>
                              </View>
                            )}
                            <Ionicons
                              name={
                                expanded === item?.id
                                  ? "chevron-up"
                                  : "chevron-down"
                              }
                              size={25}
                            />
                          </View>
                        </TouchableOpacity>
                        {expanded === item?.id && (
                          <View style={styles.orderBody}>
                            <FlatList
                              scrollEnabled={false}
                              keyExtractor={(item, index) =>
                                item.prodID + index.toString()
                              }
                              data={parsedOrderItems}
                              renderItem={({ item }) => {
                                return (
                                  <View style={styles.orderItemWrapper}>
                                    <Text style={styles.productIdText}>
                                      ProductID: {item.prodID}
                                    </Text>
                                    <Text style={styles.bodyText}>
                                      Price: {item.price}
                                    </Text>
                                    <Text style={styles.bodyText}>
                                      Quantity: {item.quantity}
                                    </Text>
                                  </View>
                                );
                              }}
                            />
                            <View style={styles.orderStatusView}>
                              {item?.is_paid === 0 && (
                                <TouchableOpacity
                                  style={[
                                    styles.orderStatusPill,
                                    { backgroundColor: color.error },
                                  ]}
                                  onPress={() => handleOrderPayPress(item)}
                                >
                                  <Text style={styles.orderStatusPillText}>
                                    Pay
                                  </Text>
                                </TouchableOpacity>
                              )}
                              {item?.is_delivered === 0 && (
                                <TouchableOpacity
                                  style={[
                                    styles.orderStatusPill,
                                    { backgroundColor: color.success },
                                  ]}
                                  onPress={() => handleOrderReceivePress(item)}
                                >
                                  <Text style={styles.orderStatusPillText}>
                                    {item?.is_delivered === 0 && "Receive"}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  }}
                />
              ) : (
                <View style={styles.emptyView}>
                  <Text style={styles.emptyViewText}>
                    There are no records to display
                  </Text>
                </View>
              ))}
            {selectedHeaderTab?.id === 3 &&
              (deliveredOrders.length > 0 ? (
                <FlatList
                  keyExtractor={(item, index) => item?.id + index.toString()}
                  contentContainerStyle={styles.scrollStyle}
                  data={deliveredOrders}
                  renderItem={({ item }) => {
                    const parsedOrderItems =
                      typeof item.order_items === "string"
                        ? JSON.parse(item?.order_items)
                        : item?.order_items;
                    return (
                      <View style={styles.orderOuterView}>
                        <TouchableOpacity
                          style={styles.orderHeader}
                          onPress={() =>
                            setExpanded(expanded === item?.id ? null : item?.id)
                          }
                        >
                          <Text style={styles.orderTitle}>
                            Order {item?.id}
                          </Text>
                          <View style={styles.row}>
                            {item?.is_paid === 1 &&
                              item?.is_delivered === 1 && (
                                <View style={styles.orderfullFilledView}>
                                  <Text style={styles.orderfullFilledViewText}>
                                    Delivered
                                  </Text>
                                </View>
                              )}
                            <Ionicons
                              name={
                                expanded === item?.id
                                  ? "chevron-up"
                                  : "chevron-down"
                              }
                              size={25}
                            />
                          </View>
                        </TouchableOpacity>
                        {expanded === item?.id && (
                          <View style={styles.orderBody}>
                            <FlatList
                              scrollEnabled={false}
                              keyExtractor={(item, index) =>
                                item.prodID + index.toString()
                              }
                              data={parsedOrderItems}
                              renderItem={({ item }) => {
                                return (
                                  <View style={styles.orderItemWrapper}>
                                    <Text style={styles.productIdText}>
                                      ProductID: {item.prodID}
                                    </Text>
                                    <Text style={styles.bodyText}>
                                      Price: {item.price}
                                    </Text>
                                    <Text style={styles.bodyText}>
                                      Quantity: {item.quantity}
                                    </Text>
                                  </View>
                                );
                              }}
                            />
                          </View>
                        )}
                      </View>
                    );
                  }}
                />
              ) : (
                <View style={styles.emptyView}>
                  <Text style={styles.emptyViewText}>
                    There are no records to display
                  </Text>
                </View>
              ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
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
    textAlign: "center",
  },
  subHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.primary,
    height: 50,
  },
  headerTabView: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  subHeaderViewTitle: {
    fontSize: 22,
    fontFamily: "mnstSemiBold",
    color: color.white,
  },
  middleView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollStyle: {
    paddingVertical: 20,
    gap: 20,
  },
  orderOuterView: {
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 5,
    padding: 20,
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  orderTitle: {
    fontSize: 20,
    fontFamily: "mnstSemiBold",
    color: color.black,
  },
  orderfullFilledView: {
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 10,
    backgroundColor: color.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  orderfullFilledViewText: {
    fontSize: 16,
    fontFamily: "mnstMedium",
    color: color.primary,
  },
  productIdText: {
    fontSize: 16,
    fontFamily: "mnstMedium",
    color: color.customBlack(1),
  },
  bodyText: {
    fontSize: 14,
    fontFamily: "mnstRegular",
    color: color.customBlack(1),
  },
  orderBody: {
    paddingTop: 10,
  },
  orderItemWrapper: {
    borderWidth: 0.5,
    borderColor: color.primary,
    marginBottom: 10,
    padding: 10,
  },
  orderStatusView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    paddingTop: 10,
  },
  orderStatusPill: {
    paddingHorizontal: 20,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  orderStatusPillText: {
    fontSize: 16,
    fontFamily: "mnstSemiBold",
    color: color.white,
  },
});
