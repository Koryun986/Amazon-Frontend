import {createSlice} from "@reduxjs/toolkit";
import type {IFavorite} from "../../types/IFavorite";

interface FavoritesState {
    favorites: IFavorite["product_id"][];
}

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice<FavoritesState>({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites: (state: FavoritesState, action) => {
            state.favorites = action.payload;
        },
        addFavorite: (state: FavoritesState, action) => {
            state.favorites = [...state.favorites, action.payload];
        },
        removeFavorite: (state: FavoritesState, action) =>{
            state.favorites = state.favorites.filter(favorite => favorite !== action.payload);
        },
    }
});

export const { setFavorites, addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;