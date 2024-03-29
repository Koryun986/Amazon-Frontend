"use client"
import dynamic from "next/dynamic";
import {useState} from "react";
import {Avatar, Button, Space} from "antd";
import Sider from "antd/es/layout/Sider";
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
            <div className="text-white px-3 mt-5">
                {!collapsed ? (
                    <Space direction={"vertical"} size={"middle"} style={{width: "100%"}}>
                        {user ? (
                          <div className="text-center">
                            <Link href={"/account"}>
                                <Avatar size={"large"}>{user.first_name}</Avatar>
                            </Link>
                            <div className="text-lg font-bold my-3">{user.first_name[0]} {user.last_name[0]}</div>
                              <Link href={"/account/addresses"}>
                                <Button>Addresses</Button>
                              </Link>
                          </div>
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
                        {user?.isAdmin && (
                          <div className="text-center">
                              <Link href={"/admin"}>
                                  <Button>Admin Page</Button>
                              </Link>
                          </div>
                        )}
                    </Space>
                ): (
                    <MenuOutlined style={{fontSize: "30px", cursor: "pointer"}} onClick={() => setCollapsed(false)} />
                )}
            </div>
        </Sider>
    )
};

export default MainLayoutSideBar;