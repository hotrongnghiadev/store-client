import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./thunk/member.thunk";

export const slice = createSlice({
  name: "member",
  initialState: {
    accessToken: null,
    data: null,
  },
  reducers: {
    signin: (state, action) => {
      const { accessToken, ...data } = action.payload;
      state.accessToken = accessToken;
      state.data = data;
    },
    logout: (state) => {
      (state.accessToken = null), (state.data = null);
    },
    addCart: (state, action) => {
      state.data.cart.push({ product: action.payload, quantity: 1 });
    },
    set: (state, action) => {
      state.data = action.payload;
    },
    updateQuantity: (state, action) => {
      const indexCart = state.data.cart.findIndex(
        (el) => el.id === action.payload.id,
      );
      state.data.cart[indexCart].quantity = action.payload.quantity;
    },
    delElCart: (state, action) => {
      state.data.cart =
        state.data.cart.filter((el) => el.id !== action.payload) || [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { signin, logout, addCart, set, updateQuantity, delElCart } =
  slice.actions;
export default slice.reducer;
