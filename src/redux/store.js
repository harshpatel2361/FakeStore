import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/CartSlice";
import authReducer from "./slices/AuthSlice";
import ordersReducer from "./slices/OrderSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whiteList: ["auth", "cart", "orders"],
};

const combineReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  orders: ordersReducer,
});

const persistReducers = persistReducer(persistConfig, combineReducer);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
