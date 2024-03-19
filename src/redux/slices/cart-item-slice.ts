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
            const item = state.cartItems.find(cartItem => cartItem.product_id === action.payload);
            if (!item)  {
                state.cartItems = [...state.cartItems, {product_id: action.payload, count: 0}];
                return;
            }
            state.cartItems = state.cartItems.map(cartItem => {
                if (cartItem.product_id !== action.payload) {
                    return cartItem;
                }
                return {
                    ...cartItem,
                    count: cartItem.count + 1,
                }
            });
        },
        removeCartItem: (state: CartItemsState, action) =>{
            const item = state.cartItems.find(cartItem => cartItem.product_id === action.payload);
            if (!item) {
                return;
            }
            if (item.count <= 1) {
                state.cartItems = state.cartItems.filter(cartItem => cartItem.product_id !== action.payload);
                return;
            }
            state.cartItems = state.cartItems.map(cartItem => {
                if (cartItem.product_id !== action.payload) {
                    return cartItem;
                }
                return {
                    ...cartItem,
                    count: cartItem.count - 1,
                }
            });
        },
    }
});

export const { setCartItems, addCartItem, removeCartItem } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;