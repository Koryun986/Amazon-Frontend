"use client"
import ColorsSelect from "./ColorsSelect";
import CategorySelect from "./CategorySelect";
import SizeSelect from "./SizeSelect";

const SideBarMenu = () => {
    return (
        <>
            <ColorsSelect />
            <SizeSelect />
            <CategorySelect />
        </>
    );
};

export default SideBarMenu;