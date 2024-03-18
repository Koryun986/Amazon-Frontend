"use client"
import {Menu, MenuProps, TreeDataNode, TreeSelect} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/store-hooks";
import {useEffect, useState} from "react";
import {fetchAddresses} from "../redux/slices/user-address-slice";
import dynamic from "next/dynamic";
import {fetchCategories} from "../redux/slices/category-slice";
import {ICategory} from "../types/ICategory";
import useFilterByParams from "../hooks/filter-by-params-hook";
import {fetchColors} from "../redux/slices/color-slice";
import ColorsSelect from "./ColorsSelect";
import CategorySelect from "./CategorySelect";

const AddressMenu = dynamic(() => import("./AddressMenu"));

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[] | null,
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

const { SHOW_CHILD } = TreeSelect;

const SideBarMenu = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);

    useEffect(() => {
        if (user) {
            dispatch(fetchAddresses());
        }
        dispatch(fetchCategories());
        dispatch(fetchColors());
    }, [user]);

    return (
        <>
            {!!user && <AddressMenu />}
            <ColorsSelect />
            <CategorySelect />
        </>
    );
};

export default SideBarMenu;