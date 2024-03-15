"use client"
import dynamic from "next/dynamic";
import Link from "next/link";
import {HeartOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Flex} from "antd";
import {useAppSelector} from "../hooks/store-hooks";

const Button = dynamic(() => import("antd").then(antd => antd.Button), {ssr: false});

const HeaderNav = () => {
    const user = useAppSelector(state => state.user.user);

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