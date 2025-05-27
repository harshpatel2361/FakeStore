import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { clearCart, clearOrders, userLogout } from "../redux/slices";
import { Button, Header } from "../components";
import { color } from "../constants";
import { useNavigation } from "@react-navigation/native";

export const UserProfileScreen = () => {
  const navigation = useNavigation();
  const { userDetails } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const handleUserLogout = () => {
    dispatch(userLogout());
    dispatch(clearCart());
    dispatch(clearOrders());
  };

  return (
    <View style={styles.mainView}>
      <Header title headerWithTitle headerTitle="User Profile" />
      <View style={styles.topView}>
        <Text style={styles.userText}>Sign out</Text>
        <TouchableOpacity
          style={styles.iconView}
          onPress={() => setIsLogoutModalVisible(true)}
        >
          <Ionicons name="power" color={color.secondary} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainView}>
        <View style={styles.lableValueFields}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{userDetails?.name}</Text>
        </View>
        <View style={styles.lableValueFields}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userDetails?.email}</Text>
        </View>
        <View style={styles.bottomView}>
          <Button btnStyle={styles.button} btnLabel='Update Profile' onPress={() => navigation.navigate('updateProfileScreen')}/>
          </View>
      </View>
      <Modal
        visible={isLogoutModalVisible}
        animationType="slide"
        transparent
        statusBarTranslucent
        onRequestClose={() => setIsLogoutModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setIsLogoutModalVisible(false)}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <View style={styles.modalBody}>
                <Text style={styles.modalBodyText}>
                  Are you sure you want to Sign out?
                </Text>
                <View style={styles.modalButtonView}>
                  <TouchableOpacity
                    onPress={() => setIsLogoutModalVisible(false)}
                    style={[
                      styles.modalButton,
                      {
                        borderRightWidth: 1,
                        borderRightColor: color.borderColor,
                      },
                    ]}
                  >
                    <Text style={styles.modalButtonText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleUserLogout}
                  >
                    <Text style={styles.modalButtonText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  userText: {
    fontSize: 30,
    fontFamily: "mnstSemiBold",
    color: color.primary,
    textTransform: "capitalize",
  },
  iconView: {
    width: 35,
    height: 35,
    backgroundColor: color.error,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  lableValueFields: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.grey,
  },
  label: {
    fontSize: 22,
    color: color.lightGrey,
    fontFamily: "mnstSemiBold",
  },
  value: {
    fontSize: 22,
    color: color.black,
    fontFamily: "mnstMedium",
    textTransform: "capitalize",
    paddingHorizontal: 20,
  },
  bottomView: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    width: '70%',
    alignSelf: 'center',
  },
  modalWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    maxHeight: 400,
    backgroundColor: color.white,
    borderRadius: 30,
  },
  modalBody: {
    paddingTop: 20,
  },
  modalBodyText: {
    fontSize: 24,
    color: color.black,
    textAlign: "center",
    fontFamily: "mnstSemiBold",
    paddingHorizontal: 40,
  },
  modalButtonView: {
    flexDirection: "row",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: color.borderColor,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  modalButtonText: {
    fontSize: 20,
    color: color.black,
    textAlign: "center",
    fontFamily: "mnstSemiBold",
  },
});
