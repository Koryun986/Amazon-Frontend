import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../types/IUser";
import api from "../../api/index";
import {AuthResponse} from "../../types/response/auth-response";

interface UserState {
    user: IUser | null;
};

const initialState: UserState = {
    user: null,
};

export const refreshUser = createAsyncThunk(
    "user/refresh",
    async () => {
        const response = await api.get<AuthResponse>("/auth/refresh", {withCredentials: true});
        return response.data;
    }
);

const userSlice = createSlice<UserState>({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(refreshUser.fulfilled, (state, action) => {
            try {
              state.user = action.payload;
            } catch (e) {
                state.user = null;
            }
        })
    }
});

export default userSlice.reducer;