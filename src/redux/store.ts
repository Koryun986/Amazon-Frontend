import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import productsSlice from "./slices/products-slice";
import userAddressSlice from "./slices/user-address-slice";
import categorySlice from "./slices/category-slice";
import colorSlice from "./slices/color-slice";
import sizeSlice from "./slices/size-slice";
import favoritesSlice from "./slices/favorites-slice";
import cartItemsSlice from "./slices/cart-item-slice";

const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            products: productsSlice,
            user_address: userAddressSlice,
            category: categorySlice,
            color: colorSlice,
            size: sizeSlice,
            favorites: favoritesSlice,
            cart_items: cartItemsSlice,
        },
    })
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default makeStore;