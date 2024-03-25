import {useEffect, useState} from "react";
import {TreeSelect} from "antd";
import {AxiosResponse} from "axios";
import useFilterByParams from "../hooks/filter-by-params-hook";
import {getAllCategories} from "../api/requests/category-request";
import type {ICategory} from "../types/ICategory";
import transformCategories from "../helpers/transform-categories";

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
            allowClear
        />
    );
};

export default CategorySelect;