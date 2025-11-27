import { configureStore } from "@reduxjs/toolkit";
import {QuantitySlice}  from "./quantity-slice"

export const Store = configureStore({
    reducer: {
        cart: QuantitySlice.reducer
    }
});