"use client"
import {useEffect} from "react";
import {Layout} from "antd";
import Header from "./Header";
import {MainLayoutSideBar} from "./MainLayoutSideBar";
import Products from "./Products";
import {useAppDispatch} from "../hooks/store-hooks";
import {getUser} from "../api/requests/auth-requests";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {setUser} from "../redux/slices/user-slice";
import type {IUser} from "../types/IUser";
import {fetchAllProducts} from "../redux/slices/products-slice";
import {useSearchParams} from "next/navigation";

const MainLayout = () => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        getUserDispatch()
    }, []);

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