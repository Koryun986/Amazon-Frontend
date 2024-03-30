import {useEffect, useState} from "react";
import {Menu, MenuProps} from "antd";
import {AxiosResponse} from "axios";
import useFilterByParams from "../hooks/filter-by-params-hook";
import {getColors} from "../api/requests/color-request";
import type {IColor} from "../types/IColor";

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

const ColorsSelect = () => {
    const [colors, setColors] = useState<IColor[]>([]);
    const [filteredColors, setFilteredColors] = useState<number[]>(null)
    useFilterByParams(filteredColors, "color");

    const fetchColors = async () => {
        try {
             const {data: colors}: AxiosResponse<IColor[]> = await getColors();
             setColors(colors);
        } catch (e) {}
    }

    useEffect(() => {
        fetchColors();
    }, []);

    const menuItems: MenuItem[] = [
        getItem("Colors", "Colors", null, colors.map(color => getItem(color.name, color.id))),
    ];

    const handleMenuItemChange = ({selectedKeys}) => {
        setFilteredColors(selectedKeys);
    }

    return (
        <Menu
            mode={"vertical"}
            items={menuItems}
            theme={"dark"}
            multiple
            selectedKeys={filteredColors}
            onSelect={handleMenuItemChange}
            onDeselect={handleMenuItemChange}
            triggerSubMenuAction={"click"}
        />
    );
};

export default ColorsSelect;