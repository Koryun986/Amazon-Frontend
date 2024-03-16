import api from "../index";
import {ApiConstants} from "../api-constants";
import type {IProduct} from "../../types/IProduct";

export async function getAllProducts(query: string = "") {
    return await api.get<IProduct[]>(`${ApiConstants.PRODUCTS_GET_ALL}${query ? `?${query}`: ""}`);
}