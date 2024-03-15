"use client"
import dynamic from "next/dynamic";
import Link from "next/link";
import {useEffect} from "react";
import {HeartOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Flex} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/store-hooks";
import api from "../api/index";
import {ApiConstants} from "../api/api-constants";
import {LocalStorageConstants} from "../constants/localstorage-constants";
import {setUser} from "../redux/slices/user-slice";
import type {AuthResponse} from "../types/response/auth-response";
import type {IUser} from "../types/IUser";
import {getUser} from "../api/requests/auth-requests";

const Button = dynamic(() => import("antd").then(antd => antd.Button), {ssr: false});

const HeaderNav = () => {
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
    }
    useEffect(() => {
        getUserDispatch()
    }, []);

    return (
        <Flex align={"center"} gap={"middle"}>
            <Link href={"/cart-items"} >
                <ShoppingOutlined style={{color: "white", fontSize: "25px"}} />
            </Link>
            <Link href={"/favorites"} >
                <HeartOutlined style={{color: "white", fontSize: "25px"}} />
            </Link>
            <div className={"text-white"}>
                {!user && (
                    <>
                        <Link href={"/auth/login"}>
                            <Button>Login</Button>
                        </Link>
                        <Link href={"/auth/registration"}>
                            <Button>Register</Button>
                        </Link>
                    </>
                )}
            </div>
        </Flex>
    )
};

export default HeaderNav;