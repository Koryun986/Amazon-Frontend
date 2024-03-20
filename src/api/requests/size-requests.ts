import {ISize} from "../../types/ISize";
import api from "../index";
import {ApiConstants} from "../api-constants";

export async function getSizes() {
    return await api.get<ISize>(ApiConstants.SIZES_GET_ALL);
}

export async function createSize(name: string) {
    return await api.post(ApiConstants.SIZE_CREATE, {name})
}

export async function updateSize(size: ISize) {
    return await api.put(ApiConstants.SIZE_UPDATE, size);
}

export async function deleteSize(id: number) {
    return await api.delete(`${ApiConstants.SIZE_DELETE}/${id}`)
}