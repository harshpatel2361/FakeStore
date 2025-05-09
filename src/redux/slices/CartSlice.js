import { createSlice } from "@reduxjs/toolkit"
import { showToast } from "../../components";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems?.find(i => i?.id === item?.id);
      if (existingItem) {
        showToast({
          type: 'error',
          text1: `${item?.title} already exists in cart`,
          position: 'top'
        })
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
        state.totalQuantity += 1
        state.totalPrice += item.price
        showToast({
          type: 'success',
          text1: `${item?.title} added to cart`,
          position: 'top'
        })
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      if (item) {
        state.totalQuantity -= item?.quantity;
        state.totalPrice -= item?.price
        state.cartItems.filter(i => i.id !== item.id);
        showToast({
          type: 'success',
          text1: `${item?.title} removed from cart`
        })
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item?.price;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      
      if (item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item?.price;
      } else {
        state.cartItems = state.cartItems.filter(i => i?.id !== item?.id);
        state.totalQuantity -= 1;
        state.totalPrice -= item?.price;
        showToast({
          type: 'success',
          text1: `${item?.title} removed from Cart`
        })
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      showToast({
        type: 'success',
        text1: 'Removed all products from Cart'
      })
    }
  }
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer