import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAddresses} from "../../api/requests/address-requests";
import type {ICategory} from "../../types/ICategory";

interface CategoryState {
    categories: ICategory[];
};

export const fetchCategories = createAsyncThunk(
    "category/fetch_all",
    async () => {
        const response = await getAddresses();
        return response.data;
    }
);

const initialState: CategoryState = {
    categories: [];
};

const userAddressSlice = createSlice<CategoryState>({
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

export default userAddressSlice.reducer;