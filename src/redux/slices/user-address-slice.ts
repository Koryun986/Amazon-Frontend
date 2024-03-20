import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IAddress} from "../../types/IAddress";
import {getAddresses} from "../../api/requests/address-requests";

interface UserAddressState {
    addresses: IAddress[];
};

export const fetchAddresses = createAsyncThunk(
    "user_address/fetch_all",
    async () => {
        const response = await getAddresses();
        return response.data;
    }
);

const initialState: UserAddressState = {
    addresses: []
};

const userAddressSlice = createSlice<UserAddressState>({
    name: "user_address",
    initialState,
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(fetchAddresses.rejected, (state) => {
            state.addresses = [];
        })
        builder.addCase(fetchAddresses.fulfilled, (state, action) => {
            state.addresses = action.payload;
        })
    })
});

export default userAddressSlice.reducer;