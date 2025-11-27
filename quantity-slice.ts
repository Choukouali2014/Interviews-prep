import { createSlice } from "@reduxjs/toolkit";

const initialState = { quantity: 0 };

export const QuantitySlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.quantity = state.quantity + 1;
    },
    decrement: (state) => {
      state.quantity = state.quantity > 0 ?  state.quantity - 1 : state.quantity;
    },
  },
});

export const { increment, decrement} = QuantitySlice.actions;

export default QuantitySlice.reducer;