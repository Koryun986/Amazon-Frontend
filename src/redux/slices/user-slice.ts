import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {IUser} from "../../types/IUser";

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