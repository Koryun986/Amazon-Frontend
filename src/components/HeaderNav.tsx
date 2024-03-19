"use client"
import Link from "next/link";
import {HeartOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Badge, Flex} from "antd";
import {useAppSelector} from "../hooks/store-hooks";

const HeaderNav = () => {
    const favorites = useAppSelector(state => state.favorites.favorites);
    console.log("favorites", favorites)
    return (
        <Flex align={"center"} gap={"middle"}>
            <Link href={"/cart-items"} >
                <ShoppingOutlined style={{color: "white", fontSize: "25px"}} />
            </Link>
            <Link href={"/favorites"} >
                <Badge count={favorites.length ? favorites.length : 0} showZero >
                    <HeartOutlined style={{color: "white", fontSize: "25px"}} />
                </Badge>
            </Link>
        </Flex>
    )
};

export default HeaderNav;