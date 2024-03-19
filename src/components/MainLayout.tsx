"use client"
import {useEffect} from "react";
import {Layout} from "antd";
import Header from "./Header";
import {MainLayoutSideBar} from "./MainLayoutSideBar";
import Products from "./Products";
import {useAppDispatch, useAppSelector} from "../hooks/store-hooks";
import {getUser} from "../api/requests/auth-requests";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {setUser} from "../redux/slices/user-slice";
import type {IUser} from "../types/IUser";
import {fetchAllProducts} from "../redux/slices/products-slice";
import {useSearchParams} from "next/navigation";
import type {IFavorite} from "../types/IFavorite";
import {setFavorites} from "../redux/slices/favorites-slice";
import {getFavorites} from "../api/requests/favorite-requests";

const MainLayout = () => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);

    const getUserDispatch = async () => {
        try {
            const {data} = await getUser();
            const user: IUser = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
            };
            localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN, data.access_token);
            dispatch(setUser(user));
        } catch (e) {
            dispatch(setUser(null));
        }
    };

    const fetchFavorites = async () => {
        try {
            const favorites = await getFavorites();
            dispatch(favorites);
        } catch (e) {}
    }

    useEffect(() => {
        getUserDispatch()
    }, []);

    useEffect(() => {
        if (user) {
            fetchFavorites();
        } else {
            const favorites = (localStorage.getItem(LocalStorageConstants.FAVORITES) ? localStorage.getItem(LocalStorageConstants.FAVORITES): []) as IFavorite[];
            dispatch(setFavorites(favorites))
        }
    }, [user])

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        dispatch(fetchAllProducts(params.toString()));
    }, [searchParams])

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Header />
            <Layout>
                <MainLayoutSideBar />
                <Products />
            </Layout>
        </Layout>
    );
};

export default MainLayout;