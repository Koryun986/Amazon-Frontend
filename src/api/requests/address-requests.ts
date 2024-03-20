import api from "../index";
import {ApiConstants} from "../api-constants";
import type {IAddress} from "../../types/IAddress";

export async function getAddresses() {
    return await api.get<IAddress[]>(ApiConstants.ADDRESSES_GET_ALL);
}

export async function updateAddress(address: IAddress) {
    return await api.put<IAddress>(ApiConstants.ADDRESS_UPDATE, address);
}

export async function createAddress(address: Omit<IAddress, "id">) {
    return await api.post<IAddress>(ApiConstants.ADDRESS_CREATE, address);
}

export async function deleteAddress(id: IAddress["id"]) {
    return await api.delete(`${ApiConstants.ADDRESS_DELETE}/${id}`);
}