import {createSlice} from "@reduxjs/toolkit";
import type {ICartItem} from "../../types/ICartItem";

interface CartItemsState {
    cartItems: Omit<ICartItem,"id">[];
}

const initialState: CartItemsState = {
    cartItems: [],
};

const cartItemsSlice = createSlice<CartItemsState>({
    name: "cart_items",
    initialState,
    reducers: {
        setCartItems: (state: CartItemsState, action) => {
            state.cartItems = action.payload;
        },
        addCartItem: (state: CartItemsState, action) => {
            state.cartItems = [...state.cartItems, action.payload];
        },
        removeCartItem: (state: CartItemsState, action) =>{
            state.cartItems = state.cartItems.filter(cartItem => cartItem !== action.payload);
        },
    }
});

export const { setCartItems, addCartItem, removeCartItem } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;