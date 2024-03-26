import api from "../index";
import {ApiConstants} from "../api-constants";
import type {IProduct} from "../../types/IProduct";
import {AxiosRequestConfig} from "axios";

export async function getAllProducts(query: string = "") {
    return (await api.get<IProduct[]>(`${ApiConstants.PRODUCTS_GET_ALL}${query ? `?${query}&limit=8`: "?limit=8"}`)).data;
}

export async function getProductById(id: string) {
    return await api.get<IProduct>(`${ApiConstants.PRODUCTS_GET_ALL}/${id}`);
}

export async function getAccountProducts() {
    return (await api.get<IProduct[]>(ApiConstants.PRODUCTS_GET_YOURS, {withCredentials: true})).data;
}

export async function addProduct(data) {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    };
    return (await api.post(ApiConstants.PRODUCT_ADD, data, config)).data;
}

export async function editProduct(data: {id: number, name: string, description: string, price: number, is_published: boolean}) {
    return (await api.put(ApiConstants.PRODUCT_EDIT, data)).data;
}

export async function deleteProduct(id: number) {
    return (await api.delete(`${ApiConstants.PRODUCT_DELETE}/${id}`)).data;
}