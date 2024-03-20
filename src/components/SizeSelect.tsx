import {useState} from "react";
import {useAppSelector} from "../hooks/store-hooks";
import useFilterByParams from "../hooks/filter-by-params-hook";
import {Menu, MenuProps} from "antd";

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
    const [filteredSize, setFilteredSize] = useState<number>(null)
    const sizes = useAppSelector(state => state.size.sizes);
    useFilterByParams(filteredSize, "size");

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
        />
    );
};

export default SizeSelect;