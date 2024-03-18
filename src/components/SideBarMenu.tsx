"use client"
import {Menu, MenuProps} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/store-hooks";
import {useEffect} from "react";
import {fetchAddresses} from "../redux/slices/user-address-slice";
import dynamic from "next/dynamic";

const AddressMenu = dynamic(() => import("./AddressMenu"));

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

const SideBarMenu = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);

    useEffect(() => {
        if (user) {
            dispatch(fetchAddresses());
        }
    }, [user]);

    const menuItems: MenuItem[] = [
        getItem("Categories", "Categories", null),
        getItem("Colors", "Colors", null),
        getItem("Sizes", "Sizes", null),
    ];

    return (
        <>
            {!!user && <AddressMenu />}
            <Menu
                mode={"vertical"}
                items={menuItems}
                theme={"dark"}
            />
        </>
    );
};

export default SideBarMenu;