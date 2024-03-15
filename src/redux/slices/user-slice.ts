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

const userSlice = createSlice<UserState>({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        }
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;