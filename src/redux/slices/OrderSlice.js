import { createSlice } from "@reduxjs/toolkit";
import { showToast } from "../../components";

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const orderItems = action.payload;
      const totalQuantity = orderItems.reduce((sum, item) => sum+item.quantity ,0);
      const totalPrice = orderItems.reduce((sum, item) => sum+item.quantity*item.price ,0);
      const newOrder = {
        id: Date.now(),
        orderItems,
        totalQuantity,
        totalPrice,
        createdAt: new Date().toISOString()
      }
      state.orders.push(newOrder);
      showToast({
        type: 'success',
        text1: 'Your Order is Placed Successfully'
      })
    },
    removeOrder: (state, action) => {
      const orderId =action.payload;
      state.orders = state.orders.filter(i => i.id !== orderId)
    },
    clearOrders: (state) => {
      state.orders = []
    }
  },
});

export const {addOrder, removeOrder, clearOrders} = ordersSlice.actions;
export default ordersSlice.reducer;