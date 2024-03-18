import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAllCategories} from "../../api/requests/category-request";
import type {IColor} from "../../types/IColor";

interface ColorState {
    colors: IColor[];
};

export const fetchColors = createAsyncThunk(
    "color/fetch_all",
    async () => {
        const response = await getAllCategories();
        return response.data;
    }
);

const initialState: ColorState = {
    colors: [],
};

const colorSlice = createSlice<ColorState>({
    name: "color",
    initialState,
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(fetchColors.rejected, (state) => {
            state.colors = [];
        })
        builder.addCase(fetchColors.fulfilled, (state, action) => {
            state.colors = action.payload;
        })
    })
});

export default colorSlice.reducer;