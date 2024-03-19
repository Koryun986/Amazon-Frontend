import {useAppDispatch, useAppSelector} from "./store-hooks";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {IFavorite} from "../types/IFavorite";
import {setFavorites, removeFavorite as removeFavoriteAction, addFavorite as addFavoriteAction} from "../redux/slices/favorites-slice";
import {addFavoriteRequest, getFavorites, removeFavoriteRequest} from "../api/requests/favorite-requests";

export default function useFavorites() {
    const user = useAppSelector(state => state.user.user);
    const favoritesStore = useAppSelector(state => state.favorites.favorites);
    const dispatch = useAppDispatch();

    const fetchFavorites = async () => {
        let favorites;
        if (user) {
            try {
                favorites = await getFavorites();
            } catch (e) {}
        } else {
            favorites = (localStorage.getItem(LocalStorageConstants.FAVORITES) ? JSON.parse(localStorage.getItem(LocalStorageConstants.FAVORITES)!): []) as IFavorite[];
        }
        dispatch(setFavorites(favorites));
    }

    const addFavorite = async (id: number) => {
        if (user) {
            try {
                await addFavoriteRequest(id);
            } catch (e) {}
        } else {
            localStorage.setItem(LocalStorageConstants.FAVORITES, JSON.stringify([...favoritesStore, id]))
        }
        dispatch(addFavoriteAction(id));
    }

    const removeFavorite = async (id: number) => {
        if (user) {
            try {
                await removeFavoriteRequest(id);
            } catch (e) {}
        } else {
            localStorage.setItem(LocalStorageConstants.FAVORITES, JSON.stringify([favoritesStore.filter(favorite => favorite !== id)]));
        }
        dispatch(removeFavoriteAction(id));
    }

    const toggleFavorite = async (id: number) => {
        if (favoritesStore.includes(id)) {
            await removeFavorite(id);
            return;
        }
        await addFavorite(id);
    }

    return {
        fetchFavorites,
        addFavorite,
        removeFavorite,
        toggleFavorite
    }
}