import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IColor} from "../../types/IColor";
import {getColors} from "../../api/requests/color-request";

interface ColorState {
    colors: IColor[];
};

export const fetchColors = createAsyncThunk(
    "color/fetch_all",
    async () => {
        const response = await getColors();
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