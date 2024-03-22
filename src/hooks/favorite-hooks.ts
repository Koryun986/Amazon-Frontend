import {useAppDispatch, useAppSelector} from "./store-hooks";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import type{IFavorite} from "../types/IFavorite";
import {
    removeFavorite as removeFavoriteAction,
    addFavorite as addFavoriteAction,
    setFavorites
} from "../redux/slices/favorites-slice";
import {addFavoriteRequest, getFavorites, removeFavoriteRequest} from "../api/requests/favorite-requests";

export default function useFavorites(id?: number) {
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();

    const getFavoritesFromStore = async () => {
        let favorites;
        if (user) {
            try {
                favorites = await getFavorites();
                return favorites.map(favorite => favorite.product_id);
            } catch (e) {
                return;
            }
        } else {
            return (localStorage.getItem(LocalStorageConstants.FAVORITES) ? JSON.parse(localStorage.getItem(LocalStorageConstants.FAVORITES)!): []) as IFavorite[];
        }
    }

    const fetchFavorites = async () => {
        const favorites = await getFavoritesFromStore();
        dispatch(setFavorites(favorites));
    }

    const addFavorite = async (id: number) => {
        if (user) {
            try {
                await addFavoriteRequest(id);
            } catch (e) {}
        } else {
            const favorites = JSON.parse(localStorage.getItem(LocalStorageConstants.FAVORITES) || JSON.stringify([]));
            localStorage.setItem(LocalStorageConstants.FAVORITES, JSON.stringify([...favorites, id]))
        }
        dispatch(addFavoriteAction(id));
    }

    const removeFavorite = async (id: number) => {
        if (user) {
            try {
                await removeFavoriteRequest(id);
            } catch (e) {}
        } else {
            const favorites = JSON.parse(localStorage.getItem(LocalStorageConstants.FAVORITES) || JSON.stringify([]));
            localStorage.setItem(LocalStorageConstants.FAVORITES, JSON.stringify([favorites.filter(favorite => favorite !== id)]));
        }
        dispatch(removeFavoriteAction(id));
    }
    const isFavorite = async (id: number) => {
        const favoritesStore = await getFavoritesFromStore();
        return favoritesStore.includes(id);
    }

    const toggleFavorite = async (id: number) => {
        if (await isFavorite(id)) {
            await removeFavorite(id);
            return;
        }
        await addFavorite(id);
    }


    return {
        fetchFavorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite
    }
}