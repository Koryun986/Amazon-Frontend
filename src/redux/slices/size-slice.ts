import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ISize} from "../../types/ISize";
import {getSizes} from "../../api/requests/size-requests";

interface SizeState {
    sizes: ISize[];
};

export const fetchSizes = createAsyncThunk(
    "size/fetch_all",
    async () => {
        const response = await getSizes();
        return response.data;
    }
);

const initialState: SizeState = {
    sizes: [],
};

const sizeSlice = createSlice<SizeState>({
    name: "size",
    initialState,
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(fetchSizes.rejected, (state) => {
            state.sizes = [];
        })
        builder.addCase(fetchSizes.fulfilled, (state, action) => {
            state.sizes = action.payload;
        })
    })
});

export default sizeSlice.reducer;