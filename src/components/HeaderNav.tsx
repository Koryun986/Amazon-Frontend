"use client"
import Link from "next/link";
import {HeartOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Badge, Flex} from "antd";
import {useAppSelector} from "../hooks/store-hooks";

const HeaderNav = () => {
  const favorites = useAppSelector(state => state.favorites.favorites);
  const cartItems = useAppSelector(state => state.cart_items.cartItems);

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