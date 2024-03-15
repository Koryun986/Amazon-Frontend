import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/IUser";
import api from "../../api/index";
import {AuthResponse} from "../../types/response/auth-response";
import {ApiConstants} from "../../api/api-constants";

interface UserState {
    user: IUser | null;
};

const initialState: UserState = {
    user: null,
};

export const getUser = createAsyncThunk(
    "user/get-user",
    async () => {
        const response = await api.get<AuthResponse>(ApiConstants.AUTH_GET_USER, {withCredentials: true});
        return response.data;
    }
);

const userSlice = createSlice<UserState>({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            try {
              state.user = action.payload;
            } catch (e) {
                console.log("error", e)
                state.user = null;
            }
        })
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;