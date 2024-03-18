"use client"
import Sider from "antd/es/layout/Sider";
import {useState} from "react";
import {Button, Menu, MenuProps, Space} from "antd";
import {useAppSelector} from "../hooks/store-hooks";
import Link from "next/link";
import {MenuOutlined} from "@ant-design/icons";

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export const MainLayoutSideBar = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const user = useAppSelector(state => state.user.user);
    const menuItems: MenuItem[] = [
        getItem(user ? "Addresses" : null, "Addresses", null),
    ]

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className="text-white pl-5 mt-5">
                {!collapsed ? (
                    <Space direction={"vertical"} size={"middle"}>
                        {user ? (
                            <>
                                <div className="text-lg font-bold">{user.first_name} {user.last_name}</div>
                                <div className="text-md font-semibold">{user.email}</div>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login">
                                    <Button>Login</Button>
                                </Link>
                                <Link href="/auth/registration">
                                    <Button>Registration</Button>
                                </Link>
                            </>
                        )}
                        <Menu
                            mode={"vertical"}
                            items={menuItems}
                            theme={"dark"}
                        />
                    </Space>
                ): (
                    <MenuOutlined style={{fontSize: "30px", cursor: "pointer"}} onClick={() => setCollapsed(false)} />
                )}
            </div>
        </Sider>
    )
};

export default MainLayoutSideBar;