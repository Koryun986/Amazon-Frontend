import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import favoritesSlice from "./slices/favorites-slice";
import cartItemsSlice from "./slices/cart-item-slice";

const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            favorites: favoritesSlice,
            cart_items: cartItemsSlice,
        },
    })
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default makeStore;