"use client"

import {Button, Menu, MenuProps, Modal, Tag} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/store-hooks";
import {useEffect, useState} from "react";
import {fetchAddresses} from "../redux/slices/user-address-slice";
import useModal from "../hooks/modal-hook";
import {IAddress} from "../types/IAddress";
import AddressForm from "./forms/AddressForm";
import AddressMenu from "./AddressMenu";

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
    const [activeAddress, setActiveAddress] = useState<IAddress | null>(null);
    const {isActive, openModal, closeModal} = useModal();
    const dispatch = useAppDispatch();
    const addresses = useAppSelector(state => state.user_address.addresses);
    const user = useAppSelector(state => state.user.user);

    useEffect(() => {
        if (user) {
            dispatch(fetchAddresses());
        }
    }, [user]);

    const menuItems: MenuItem[] = [];

    return (
        <>
            <AddressMenu />
            <Menu
                mode={"vertical"}
                items={menuItems}
                theme={"dark"}
            />
        </>
    );
};

export default SideBarMenu;