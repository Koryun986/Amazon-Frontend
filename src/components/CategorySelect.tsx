import {useEffect, useState} from "react";
import {TreeSelect} from "antd";
import {AxiosResponse} from "axios";
import useFilterByParams from "../hooks/filter-by-params-hook";
import {getAllCategories} from "../api/requests/category-request";
import type {ICategory} from "../types/ICategory";

const { SHOW_CHILD } = TreeSelect;

const CategorySelect = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
    useFilterByParams(filteredCategories, "category");

    const fetchCategories = async () => {
        try {
            const { data: categories }: AxiosResponse<ICategory[]> = await getAllCategories();
            setCategories(categories);
        } catch (e) {}
    }

    useEffect(() => {
        fetchCategories();
    }, []);

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