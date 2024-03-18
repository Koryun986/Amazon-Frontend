import api from "../index";
import {ApiConstants} from "../api-constants";
import {ICategory} from "../../types/ICategory";

export async function getAllCategories() {
    return await api.get<ICategory[]>(ApiConstants.CATEGORIES_GET_ALL);
}

type CategoryPostForm = {
    name: string;
    parent_id: number;
}

export async function createCategory(category: CategoryPostForm) {
    return await api.post(ApiConstants.CATEGORY_CREATE, category)
}

export async function updateCategory(category: CategoryPostForm & {id: number}) {
    return await api.put(ApiConstants.CATEGORY_UPDATE, category);
}

export async function deleteCategory(id) {
    return await api.delete(`${ApiConstants.CATEGORY_DELETE}/${id}`);
}