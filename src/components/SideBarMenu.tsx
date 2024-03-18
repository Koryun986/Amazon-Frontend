"use client"
import {useAppDispatch, useAppSelector} from "../hooks/store-hooks";
import {useEffect, useState} from "react";
import {fetchAddresses} from "../redux/slices/user-address-slice";
import dynamic from "next/dynamic";
import {fetchCategories} from "../redux/slices/category-slice";
import {fetchColors} from "../redux/slices/color-slice";
import ColorsSelect from "./ColorsSelect";
import CategorySelect from "./CategorySelect";
import SizeSelect from "./SizeSelect";
import {fetchSizes} from "../redux/slices/size-slice";

const AddressMenu = dynamic(() => import("./AddressMenu"));

const SideBarMenu = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);

    useEffect(() => {
        if (user) {
            dispatch(fetchAddresses());
        }
        dispatch(fetchCategories());
        dispatch(fetchColors());
        dispatch(fetchSizes());
    }, [user]);

    return (
        <>
            {!!user && <AddressMenu />}
            <ColorsSelect />
            <SizeSelect />
            <CategorySelect />
        </>
    );
};

export default SideBarMenu;