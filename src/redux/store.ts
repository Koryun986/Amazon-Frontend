import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import productsSlice from "./slices/products-slice";
import userAddressSlice from "./slices/user-address-slice";
import categorySlice from "./slices/category-slice";

const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            products: productsSlice,
            user_address: userAddressSlice,
            category: categorySlice,
        },
    })
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default makeStore;