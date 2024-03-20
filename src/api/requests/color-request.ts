import api from "../index";
import {ApiConstants} from "../api-constants";
import {IColor} from "../../types/IColor";

export async function getColors() {
    return await api.get(ApiConstants.COLORS_GET_ALL);
}

export async function createColor(name: string) {
    return await api.post(ApiConstants.COLOR_CREATE, {name});
}

export async function updateColor(color: IColor) {
    return await api.put(ApiConstants.COLOR_UPDATE, color);
}

export async function deleteColor(id: number) {
    return await api.delete(`${ApiConstants.COLOR_DELETE}/${id}`)
}