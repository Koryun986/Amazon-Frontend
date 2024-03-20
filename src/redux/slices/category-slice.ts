import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAllCategories} from "../../api/requests/category-request";
import type {ICategory} from "../../types/ICategory";

interface CategoryState {
    categories: ICategory[];
};

export const fetchCategories = createAsyncThunk(
    "category/fetch_all",
    async () => {
        const response = await getAllCategories();
        return response.data;
    }
);

const initialState: CategoryState = {
    categories: [],
};

const categorySlice = createSlice<CategoryState>({
    name: "category",
    initialState,
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(fetchCategories.rejected, (state) => {
            state.categories = [];
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
    })
});

export default categorySlice.reducer;