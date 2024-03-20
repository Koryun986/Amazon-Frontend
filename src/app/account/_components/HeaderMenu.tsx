"use client"
import {Menu, MenuProps} from "antd";
import {HeartOutlined, HomeOutlined, ProductOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {AccountPageList} from "./AccountPage";
import {FC} from "react";

interface HeaderMenuProps {
    current: AccountPageList;
    setCurrent: (current: AccountPageList) => void;
}

const HeaderMenu: FC<HeaderMenuProps> = ({current, setCurrent}) => {
    const items: MenuProps["items"] = [
        {
          label: "Products",
          key: "Products",
          icon: <ProductOutlined />
        },
        {
            label: "Favorites",
            key: "Favorites",
            icon: <HeartOutlined />,
        },
        {
            label: "Cart Items",
            key: "Cart Items",
            icon: <ShoppingCartOutlined />,
        },
        {
            label: "Addresses",
            key: "Addresses",
            icon: <HomeOutlined />
        },
    ];
    return (
        <Menu
            mode="horizontal"
            selectedKeys={[current]}
            onClick={(e) => setCurrent(e.key as AccountPageList)}
            items={items}
        />
    )
};

export default HeaderMenu;