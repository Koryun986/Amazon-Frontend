"use client"
import {Menu, MenuProps, TreeDataNode, TreeSelect} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/store-hooks";
import {useEffect, useState} from "react";
import {fetchAddresses} from "../redux/slices/user-address-slice";
import dynamic from "next/dynamic";
import {fetchCategories} from "../redux/slices/category-slice";
import {ICategory} from "../types/ICategory";
import useFilterByParams from "../hooks/filter-by-params-hook";

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
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);
    const categories = useAppSelector(state => state.category.categories);
    useFilterByParams(filteredCategories, "category");
    useEffect(() => {
        if (user) {
            dispatch(fetchAddresses());
        }
        dispatch(fetchCategories());
    }, [user]);

    const menuItems: MenuItem[] = [
        getItem("Colors", "Colors", null),
        getItem("Sizes", "Sizes", null),
    ];

    function transformCategories(categories: ICategory[]) {
        return categories.map(category => {
            const transformedCategory = {
                title: category.name,
                value: category.id,
                key: category.id,
                children: []
            };

            if (category.children && category.children.length > 0) {
                transformedCategory.children = transformCategories(category.children);
            }

            return transformedCategory;
        });
    }

    const handleCategoryChange = (newValue: string[]) => {
        setFilteredCategories(newValue);
    };

    return (
        <>
            {!!user && <AddressMenu />}
            <Menu
                mode={"inline"}
                items={menuItems}
                theme={"dark"}
            />
            <TreeSelect
                style={{width: "100%"}}
                value={filteredCategories}
                placeholder={"Select categories"}
                treeData={transformCategories(categories)}
                onChange={handleCategoryChange}
                showCheckedStrategy={SHOW_CHILD}
                treeCheckable={true}
            />
        </>
    );
};

export default SideBarMenu;