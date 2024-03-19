import {useAppDispatch, useAppSelector} from "./store-hooks";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {addCartItem as addCartItemAction, removeCartItem as removeCartItemAction, setCartItems} from "../redux/slices/cart-item-slice";
import {addCartItemRequest, getCartItems} from "../api/requests/cart-item-requests";
import {ICartItem} from "../types/ICartItem";

export default function useCartItems() {
    const user = useAppSelector(state => state.user.user);
    const cartItemsStore = useAppSelector(state => state.cart_items.cartItems);
    const dispatch = useAppDispatch();

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

    const addCartItem = async (id: number) => {
        if (user) {
            try {
                await addCartItemRequest(id);
            } catch (e) {}
        } else {
            localStorage.setItem(LocalStorageConstants.FAVORITES, JSON.stringify([...cartItemsStore, id]))
        }
        dispatch(addCartItemAction(id));
    }

    const removeCartItem = async (id: number) => {
        if (user) {
            try {
                await removeCartItem(id);
            } catch (e) {}
        } else {
            localStorage.setItem(LocalStorageConstants.FAVORITES, JSON.stringify([cartItemsStore.filter(favorite => favorite !== id)]));
        }
        dispatch(removeCartItemAction(id));
    }

    return {
        fetchCartItems,
        addCartItem,
        removeCartItem,
    }
}