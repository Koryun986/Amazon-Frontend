"use client"
import {ReactNode, useEffect, useState} from "react";
import {getUser} from "../../../api/requests/auth-requests";
import {LocalStorageConstants} from "../../../constants/localstorage-constants";
import {setUser} from "../../../redux/slices/user-slice";
import {useAppDispatch, useAppSelector} from "../../../hooks/store-hooks";
import AccountHeader from "./AccountHeader";
import type {IUser} from "../../../types/IUser";
import AccountProductsList from "./AccountProductsList";

export type AccountPageList = "Favorites" | "Cart Items" | "Addresses" | "Products";

const AccountPages: Record<AccountPageList, ReactNode | null> = {
    Favorites: null,
    "Cart Items": null,
    Addresses: null,
    Products: <AccountProductsList />,
};

const AccountPage = () => {
    const [listName, setListName] = useState<AccountPageList>("Products");
    const user = useAppSelector(state => state.user.user);
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

    return (
        <div className="container mx-auto">
            {user && (
                <>
                    <AccountHeader user={user} menuItem={listName} setMenuItem={setListName} />
                    <div>
                        {AccountPages[listName]}
                    </div>
                </>
            )}
        </div>
    )
};

export default AccountPage;