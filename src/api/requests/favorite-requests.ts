import api from "../index";
import {ApiConstants} from "../api-constants";
import type {IFavorite} from "../../types/IFavorite";

export async function getFavorites() {
    return(await api.get<IFavorite[]>(ApiConstants.FAVORITES_GET_ALL)).data;
}

export async function addFavoriteRequest(productId: number) {
    return (await api.post(ApiConstants.FAVORITE_ADD, {id: productId})).data;
}

export async function addManyFavoritesRequest(productIds: number[]) {
    return (await api.post(ApiConstants.FAVORITE_ADD_MANY, productIds)).data;
}

export async function removeFavoriteRequest(productId: number) {
    return (await api.delete(`${ApiConstants.FAVORITE_REMOVE}/${productId}`)).data;
}