import {ApiConstants} from "../api-constants";
import api from "../index";
import {ICartItem} from "../../types/ICartItem";

export async function getCartItems() {
    return (await api.get(ApiConstants.CART_ITEMS_GET_ALL)).data;
}

export async function addCartItemRequest(productId: number) {
    return (await api.post(`${ApiConstants.CART_ITEM_ADD}/${productId}`)).data;
}

export async function addManyCartItemsRequest(cartItems: Omit<ICartItem, "id">[]) {
    return (await api.post(ApiConstants.CART_ITEM_ADD_MANY, cartItems)).data;
}

export async function removeCartItemRequest(productId: number) {
    return (await api.delete(`${ApiConstants.CART_ITEM_REMOVE}/${productId}`)).data;
}