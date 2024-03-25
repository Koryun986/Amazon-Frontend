"use client"
import {ReactNode, useEffect, useState} from "react";
import {getUser} from "../../../api/requests/auth-requests";
import {LocalStorageConstants} from "../../../constants/localstorage-constants";
import {setUser} from "../../../redux/slices/user-slice";
import {useAppDispatch, useAppSelector} from "../../../hooks/store-hooks";
import Link from "next/link";
import {Avatar, Button, Divider} from "antd";
import {HeartFilled, ProductOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import type {IUser} from "../../../types/IUser";

export type AccountPageList = "Favorites" | "Cart Items" | "Addresses" | "Products";

const AccountPage = () => {
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

    if (!user) {
        return (
          <div className="h-screen flex justify center items-center flex-col gap-4">
              <div className="text-3xl font-bold">Create account or log in</div>
              <Link href="/auth/login">
                  <Button>Login</Button>
              </Link>
              <Link href="/auth/registration">
                  <Button>Registration</Button>
              </Link>
          </div>
        )
    }

    return (
        <div className="container mx-auto">
            <div className="pt-10 flex flex-col items-center gap-4">
                <Avatar size={50} style={{backgroundColor: "#001529", fontSize: "16px"}}>{user.first_name}</Avatar>
                <div className="text-2xl font-bold">{user.first_name} {user.last_name}</div>
                <div className="text-lg font-semibold">{user.email}</div>
                <Link href="/account/products">
                    <Button size={"large"} style={{height: "100%", display: "flex", alignItems: "center"}}>
                        <ProductOutlined /> Your Products
                    </Button>
                </Link>
                <Link href="/favorites" style={{height: "100%", display: "flex", alignItems: "center"}}>
                    <Button size={"large"}>
                        <HeartFilled /> Your Favorites
                    </Button>
                </Link>
                <Link href="/cart-items">
                    <Button size={"large"} style={{height: "100%", display: "flex", alignItems: "center"}}>
                        <ShoppingCartOutlined /> Your Cart Items
                    </Button>
                </Link>
                <Divider />
                <Link href="/auth/change-password">
                    <Button size={"large"} style={{height: "100%", display: "flex", alignItems: "center"}}>
                        Change Password
                    </Button>
                </Link>
            </div>
        </div>
    )
};

export default AccountPage;