import {TreeSelect} from "antd";
import useFilterByParams from "../hooks/filter-by-params-hook";
import {useState} from "react";
import {ICategory} from "../types/ICategory";
import {useAppSelector} from "../hooks/store-hooks";
const { SHOW_CHILD } = TreeSelect;

const CategorySelect = () => {
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
    const categories = useAppSelector(state => state.category.categories);
    useFilterByParams(filteredCategories, "category");
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
        <TreeSelect
            style={{width: "100%"}}
            value={filteredCategories}
            placeholder={"Select categories"}
            treeData={transformCategories(categories)}
            onChange={handleCategoryChange}
            showCheckedStrategy={SHOW_CHILD}
            treeCheckable={true}
        />
    );
};

export default CategorySelect;