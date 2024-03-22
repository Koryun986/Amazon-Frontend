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
        setCartItem: (state: CartItemsState, action) => {
            const cartItem = state.cartItems.find(item => item.product_id === action.payload.product_id);
            if (cartItem) {
                if (!action.payload.count) {
                    state.cartItems = state.cartItems.filter(item => item.product_id !== cartItem.product_id);
                    return;
                }
                state.cartItems = state.cartItems.map(item => {
                    if (item.product_id !== cartItem.product_id) {
                        return item;
                    }
                    return {
                        ...item,
                        count: action.payload.count,
                    };
                });
                return;
            }
            if (!action.payload.count) {
                return;
            }
            state.cartItems = [...state.cartItems, action.payload];
        }
    }
});

export const { setCartItems, setCartItem } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;