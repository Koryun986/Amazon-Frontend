"use client"

import {useEffect, useState} from "react";
import {Empty, Tree} from "antd";
import CategoryAddButton from "./CategoryAddButton";
import {getAllCategories} from "../../../../api/requests/category-request";
import {transformCategoriesWithCustomTitle} from "../../../../helpers/transform-categories";
import CategoryItem from "./CategoryItem";
import type {ICategory} from "../../../../types/ICategory";

const CategoryTree = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesChangeTrigger, setCategoriesChangeTrigger] = useState(false);

  const fetchCategories = async () => {
    try {
      const {data} = await getAllCategories();
      setCategories(data);
    } catch (e) {}
  }

  useEffect(() => {
    fetchCategories();
  }, [categoriesChangeTrigger]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">Categories</div>
        <CategoryAddButton categories={categories} onChange={() => setCategoriesChangeTrigger(prevState => !prevState)}/>
      </div>
      {categories.length ? (
        <Tree
          treeData={transformCategoriesWithCustomTitle(categories, (category) => (
            <CategoryItem categories={categories} category={category} onChange={() => setCategoriesChangeTrigger(prevState => !prevState)} />
          ))}
          defaultExpandAll
        />
      ) : (<Empty />)}
    </>
  )
};

export default CategoryTree;