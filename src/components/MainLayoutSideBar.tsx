"use client"
import Sider from "antd/es/layout/Sider";
import {useEffect, useState} from "react";
import {Button, Menu, MenuProps, Space} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/store-hooks";
import Link from "next/link";
import {MenuOutlined} from "@ant-design/icons";
import {fetchAddresses} from "../redux/slices/user-address-slice";

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
    const dispatch = useAppDispatch();
    const addresses = useAppSelector(state => state.user_address.addresses);
    const user = useAppSelector(state => state.user.user);

    useEffect(() => {
        if (user) {
            dispatch(fetchAddresses());
        }
    }, [user]);

    const addressItems: MenuItem[] = [
        ...addresses.map(address => getItem(<Link href={`/address/${address.id}`}>{address.street_address} / {address.zip_code}</Link>, address.id, null)),
        getItem(<Link href="address/create"><Button style={{width: "100%"}}>Add</Button></Link>, "add-address"),
    ];

    const menuItems: MenuItem[] = [
        getItem( "Addresses", "Addresses", null, addressItems),
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
                            items={user ? menuItems : menuItems.slice(1)}
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