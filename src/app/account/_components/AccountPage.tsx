"use client"
import {useEffect, useState} from "react";
import Link from "next/link";
import {Avatar, Button, Card, Divider, Dropdown, Space} from "antd";
import type {MenuProps} from "antd";
import {HeartOutlined, HomeOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {getUser} from "../../../api/requests/auth-requests";
import {LocalStorageConstants} from "../../../constants/localstorage-constants";
import {setUser} from "../../../redux/slices/user-slice";
import {useAppDispatch, useAppSelector} from "../../../hooks/store-hooks";
import HeaderMenu from "./HeaderMenu";
import type {IUser} from "../../../types/IUser";

export type AccountPageList = "Favorites" | "Cart Items" | "Addresses" | "Products"

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
                <div className="py-8 flex items-center justify-between">
                    <Space direction={"horizontal"}>
                        <Avatar size={40} style={{backgroundColor: "#001529", fontSize: "16px"}}>{user.first_name[0]} {user.last_name[0]}</Avatar>
                        <div>{user.email}</div>
                    </Space>
                    <HeaderMenu current={listName} setCurrent={setListName} />
                </div>
            )}
        </div>
    )
};

export default AccountPage;