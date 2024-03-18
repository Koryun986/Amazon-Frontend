import {ISize} from "../../types/ISize";
import api from "../index";
import {ApiConstants} from "../api-constants";

export async function getSizes() {
    return await api.get<ISize>(ApiConstants.COLORS_GET_ALL);
}

export async function createSize(name: string) {
    return await api.post(ApiConstants.COLOR_CREATE, {name})
}

export async function updateSize(size: ISize) {
    return await api.put(ApiConstants.COLOR_UPDATE, size);
}

export async function deleteSize(id: number) {
    return await api.delete(`${ApiConstants.COLOR_DELETE}/${id}`)
}