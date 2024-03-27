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
    const dispatch = useAppDispatch();
    const [localCartItemCount, setLocalCartItemCount] = useState<number>(0);

    const fetchCartItemsFromStore = async () => {
        if (user) {
            try {
                return await getCartItems();
            } catch (e) {
                return [];
            }
        } else {
            return (localStorage.getItem(LocalStorageConstants.CART_ITEMS) ? JSON.parse(localStorage.getItem(LocalStorageConstants.CART_ITEMS)!): []) as Omit<ICartItem, "id">[];
        }
    }

    const fetchCartItems = async () => {
        const cartItems = await fetchCartItemsFromStore();
        dispatch(setCartItems(cartItems));
    }

    const setInitialLocalCartItemCount = async () => {
        const cartItems = await fetchCartItemsFromStore();
        setLocalCartItemCount(cartItems?.find(cartItem => cartItem.product_id === productId)?.count || 0);
    }

    useEffect(() => {
        fetchCartItems();
        if (productId) {
            setInitialLocalCartItemCount();
        }
    }, [user]);

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
            } catch (e) {
                return;
            }
        } else {
            const cartItems = (localStorage.getItem(LocalStorageConstants.CART_ITEMS) ? JSON.parse(localStorage.getItem(LocalStorageConstants.CART_ITEMS)!): []) as Omit<ICartItem, "id">[];
            const currentItem = cartItems.find(item => item.product_id === productId);
            let newCartItems;
            if (currentItem) {
                if (localCartItemCount) {
                    newCartItems = cartItems.map(item => {
                        if (item.product_id !== productId) {
                            return item;
                        }
                        return cartItem;
                    })
                } else {
                    newCartItems = cartItems.filter(item => item.product_id !== productId);
                }
            } else {
                newCartItems = [...cartItems, cartItem];
            }
            localStorage.setItem(LocalStorageConstants.CART_ITEMS, JSON.stringify(newCartItems));
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