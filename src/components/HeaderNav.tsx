"use client"
import Link from "next/link";
import {HeartOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Flex} from "antd";

const HeaderNav = () => {
    return (
        <Flex align={"center"} gap={"middle"}>
            <Link href={"/cart-items"} >
                <ShoppingOutlined style={{color: "white", fontSize: "25px"}} />
            </Link>
            <Link href={"/favorites"} >
                <HeartOutlined style={{color: "white", fontSize: "25px"}} />
            </Link>
        </Flex>
    )
};

export default HeaderNav;