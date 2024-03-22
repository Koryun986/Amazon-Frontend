"use client"
import Link from "next/link";
import {HeartOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Badge, Flex} from "antd";
import useFavorites from "../hooks/favorite-hooks";
import useCartItems from "../hooks/cart-item-hooks";

const HeaderNav = () => {
    const {favorites} = useFavorites();
    const { cartItems } = useCartItems();

    return (
        <Flex align={"center"} gap={"middle"}>
            <Link href={"/cart-items"} >
                <Badge count={cartItems.length} showZero >
                    <ShoppingOutlined style={{color: "white", fontSize: "25px"}} />
                </Badge>
            </Link>
            <Link href={"/favorites"} >
                <Badge count={favorites.length} showZero >
                    <HeartOutlined style={{color: "white", fontSize: "25px"}} />
                </Badge>
            </Link>
        </Flex>
    )
};

export default HeaderNav;