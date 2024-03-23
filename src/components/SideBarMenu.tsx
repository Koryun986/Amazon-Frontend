"use client"
import {useAppSelector} from "../hooks/store-hooks";
import dynamic from "next/dynamic";
import ColorsSelect from "./ColorsSelect";
import CategorySelect from "./CategorySelect";
import SizeSelect from "./SizeSelect";

const AddressMenu = dynamic(() => import("./AddressMenu"));

const SideBarMenu = () => {
    const user = useAppSelector(state => state.user.user);

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