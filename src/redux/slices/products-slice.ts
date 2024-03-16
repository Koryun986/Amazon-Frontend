import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {IProduct} from "../../types/IProduct";
import {getAllProducts} from "../../api/requests/product-requests";

interface ProductsState {
    products: IProduct[];
    isLoading: boolean;
    error: string | null;
};

export const fetchAllProducts = createAsyncThunk(
    "products/get-all",
    async () => {
        const response = await getAllProducts();
        return response.data;
    }
)

const initialState: ProductsState = {
    products: [],
    isLoading: false,
    error: null,
};

const productsSlice = createSlice<ProductsState>({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchAllProducts.rejected, (state) => {
            state.isLoading = false;
            state.error = "Oops! Something went wrong";
        })
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.products = action.payload;
        })
    })
});

export default productsSlice.reducer;