import {useAppDispatch, useAppSelector} from "./store-hooks";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {IFavorite} from "../types/IFavorite";
import {setFavorites, removeFavorite as removeFavoriteAction, addFavorite as addFavoriteAction} from "../redux/slices/favorites-slice";
import {addFavoriteRequest, getFavorites, removeFavoriteRequest} from "../api/requests/favorite-requests";
import {useEffect, useState} from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>([]);
    const user = useAppSelector(state => state.user.user);
    const favoritesStore = useAppSelector(state => state.favorites.favorites);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        let favorites;
        if (user) {
            try {
                favorites = await getFavorites();
                favorites = favorites.map(favorite => favorite.product_id);
            } catch (e) {}
        } else {
            favorites = (localStorage.getItem(LocalStorageConstants.FAVORITES) ? JSON.parse(localStorage.getItem(LocalStorageConstants.FAVORITES)!): []) as IFavorite[];
        }
        setFavorites(favorites);
        // dispatch(setFavorites(favorites));
    }

    const addFavorite = async (id: number) => {
        if (user) {
            try {
                await addFavoriteRequest(id);
            } catch (e) {}
        } else {
            localStorage.setItem(LocalStorageConstants.FAVORITES, JSON.stringify([...favoritesStore, id]))
        }
        await fetchFavorites();
        // dispatch(addFavoriteAction(id));
    }

    const removeFavorite = async (id: number) => {
        if (user) {
            try {
                await removeFavoriteRequest(id);
            } catch (e) {}
        } else {
            localStorage.setItem(LocalStorageConstants.FAVORITES, JSON.stringify([favoritesStore.filter(favorite => favorite !== id)]));
        }
        await fetchFavorites();
        // dispatch(removeFavoriteAction(id));
    }

    const toggleFavorite = async (id: number) => {
        if (favoritesStore.includes(id)) {
            await removeFavorite(id);
            return;
        }
        await addFavorite(id);
    }

    return {
        favorites,
        fetchFavorites,
        addFavorite,
        removeFavorite,
        toggleFavorite
    }
}