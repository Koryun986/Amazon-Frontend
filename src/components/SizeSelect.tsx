import {useEffect, useState} from "react";
import {Menu, MenuProps} from "antd";
import {AxiosResponse} from "axios";
import useFilterByParams from "../hooks/filter-by-params-hook";
import {getSizes} from "../api/requests/size-requests";
import type {ISize} from "../types/ISize";

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


const SizeSelect = () => {
    const [sizes, setSizes] = useState<ISize[]>([]);
    const [filteredSize, setFilteredSize] = useState<number>(null)
    useFilterByParams(filteredSize, "size");

    const fetchSizes = async () => {
        try {
            const { data: sizes }: AxiosResponse<ISize[]> = await getSizes();
            setSizes(sizes);
        } catch (e) {}
    }

    useEffect(() => {
        fetchSizes();
    }, []);

    const menuItems: MenuItem[] = [
        getItem("Sizes", "Sizes", null, sizes.map(size => getItem(size.name, size.id))),
    ];

    const handleMenuItemClick = ({key}) => {
        if (filteredSize === key) {
            setFilteredSize(null);
            return;
        }
        setFilteredSize(key);
    }

    return (
        <Menu
            mode={"vertical"}
            items={menuItems}
            theme={"dark"}
            selectedKeys={[filteredSize]}
            onClick={handleMenuItemClick}
            triggerSubMenuAction={"click"}
        />
    );
};

export default SizeSelect;