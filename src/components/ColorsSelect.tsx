import {Menu, MenuProps} from "antd";
import {useAppSelector} from "../hooks/store-hooks";
import {useState} from "react";
import useFilterByParams from "../hooks/filter-by-params-hook";

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
    const [filteredColor, setFilteredColor] = useState<number>(null)
    const colors = useAppSelector(state => state.color.colors);
    useFilterByParams(filteredColor, "color");

    const menuItems: MenuItem[] = [
        getItem("Colors", "Colors", null, colors.map(color => getItem(color.name, color.id))),
    ];

    const handleMenuItemClick = ({key}) => {
        if (filteredColor === key) {
            setFilteredColor(null);
            return;
        }
        setFilteredColor(key);
    }

    return (
        <Menu
            mode={"vertical"}
            items={menuItems}
            theme={"dark"}
            selectedKeys={[filteredColor]}
            onClick={handleMenuItemClick}
        />
    );
};

export default ColorsSelect;