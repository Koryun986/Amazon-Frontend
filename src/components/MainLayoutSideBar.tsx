"use client"
import Sider from "antd/es/layout/Sider";
import {useState} from "react";
import {Avatar, Button, Space} from "antd";
import {useAppSelector} from "../hooks/store-hooks";
import Link from "next/link";
import {MenuOutlined} from "@ant-design/icons";
import SideBarMenu from "./SideBarMenu";

export const MainLayoutSideBar = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const user = useAppSelector(state => state.user.user);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className="text-white px-5 mt-5">
                {!collapsed ? (
                    <Space direction={"vertical"} size={"middle"} style={{width: "100%"}}>
                        {user ? (
                            <Space direction={"vertical"} align={"center"}>
                                <Link href={"/account"}>
                                    <Avatar size={"large"}>{user.first_name}</Avatar>
                                </Link>
                                <div className="text-lg font-bold">{user.first_name} {user.last_name}</div>
                                <div className="text-md font-semibold">{user.email}</div>
                            </Space>
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
                        <SideBarMenu />
                    </Space>
                ): (
                    <MenuOutlined style={{fontSize: "30px", cursor: "pointer"}} onClick={() => setCollapsed(false)} />
                )}
            </div>
        </Sider>
    )
};

export default MainLayoutSideBar;