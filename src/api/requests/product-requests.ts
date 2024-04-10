import api from "../index";
import {ApiConstants} from "../api-constants";
import type {IProduct} from "../../types/IProduct";
import {AxiosRequestConfig} from "axios";

export async function getAllProducts(query: string = "") {
    return (await api.get<{products: IProduct[], count: number}>(`${ApiConstants.PRODUCTS_GET_ALL}${query ? `?${query}&limit=8`: "?limit=8"}`)).data;
}

export async function getProductById(id: string) {
    return await api.get<IProduct>(`${ApiConstants.PRODUCTS_GET_ALL}/${id}`);
}

export async function getAccountProducts() {
    return (await api.get<IProduct[]>(ApiConstants.PRODUCTS_GET_YOURS, {withCredentials: true})).data;
}

export async function getProductsByIds(ids: number[], query: string = "") {
    return (await api.post<IProduct[]>(`${ApiConstants.PRODUCTS_GET_BY_IDS}?${query}`, {ids})).data;
}

export async function addProduct(data) {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    };
    return (await api.post(ApiConstants.PRODUCT_ADD, data, config)).data;
}

export async function editProduct(data: {id: number, name: string, description: string, price: number, colors: string[], sizes: string[], category: number, is_published: boolean}) {
    return (await api.put(ApiConstants.PRODUCT_EDIT, data)).data;
}

export async function deleteProduct(id: number) {
    return (await api.delete(`${ApiConstants.PRODUCT_DELETE}/${id}`)).data;
}

export async function buyProductClientSecret(data: {id: number, count: number, payment_id?: string}) {
    return (await api.post(ApiConstants.PRODUCT_BUY_CLIENT_SECRET, data));
}

export async function buyCartProductsCheckout() {
    return (await api.post(ApiConstants.PRODUCT_BUY_CART_CHECKOUT));
}

export async function fetchOrders() {
    return await api.get(ApiConstants.PRODUCTS_GET_ORDERS);
}
