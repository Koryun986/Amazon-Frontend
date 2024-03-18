import api from "../index";
import {ApiConstants} from "../api-constants";
import type {IAddress} from "../../types/IAddress";

export async function getAddresses() {
    return await api.get<IAddress[]>(ApiConstants.ADDRESSES_GET_ALL);
}

export async function updateAddress(address: IAddress) {
    return await api.put<IAddress>(ApiConstants.ADDRESS_UPDATE, address);
}