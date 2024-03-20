import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "./store-hooks";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {setCartItems, setCartItem as setCartItemAction} from "../redux/slices/cart-item-slice";
import {
    getCartItems,
    setCartItemRequest
} from "../api/requests/cart-item-requests";
import type {ICartItem} from "../types/ICartItem";

export default function useCartItems(productId?: number) {
    const user = useAppSelector(state => state.user.user);
    const cartItemsStore = useAppSelector(state => state.cart_items.cartItems);
    const dispatch = useAppDispatch();
    const [localCartItemCount, setLocalCartItemCount] = useState<number>(0);

    useEffect(() => {
        if (!user) {
            localStorage.setItem(LocalStorageConstants.CART_ITEMS, JSON.stringify(cartItemsStore));
        }
        if (productId) {
            setLocalCartItemCount(cartItemsStore.find(cartItem => cartItem.product_id === productId)?.count || 0);
        }
    }, [cartItemsStore]);

    const fetchCartItems = async () => {
        let cartItems;
        if (user) {
            try {
                cartItems = await getCartItems();
            } catch (e) {}
        } else {
            cartItems = (localStorage.getItem(LocalStorageConstants.CART_ITEMS) ? JSON.parse(localStorage.getItem(LocalStorageConstants.CART_ITEMS)!): []) as Omit<ICartItem, "id">[];
        }
        dispatch(setCartItems(cartItems));
    }

    const addCartItem = () => {
        setLocalCartItemCount(prevCount => prevCount + 1);
    }

    const removeCartItem = () => {
        if (!localCartItemCount) {
            return;
        }
        setLocalCartItemCount(prevCount => prevCount - 1);
    }

    const setCartItem = async () => {
        const cartItem = {product_id: productId!, count: localCartItemCount};
        if (user) {
            try {
                await setCartItemRequest(cartItem);
            } catch (e) {}
        }
        dispatch(setCartItemAction(cartItem))
    }

    return {
        fetchCartItems,
        addCartItem,
        removeCartItem,
        setCartItem,
        cartItemCount: localCartItemCount,
    }
}