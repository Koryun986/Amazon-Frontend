"use client"

import CategoryAddButton from "./CategoryAddButton";
import {useEffect, useState} from "react";
import type {ICategory} from "../../../../types/ICategory";
import {getAllCategories} from "../../../../api/requests/category-request";
import {Empty, Tree} from "antd";
import transformCategories from "../../../../helpers/transform-categories";

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
        <CategoryAddButton />
      </div>
      {categories.length ? (
        <Tree
          treeData={transformCategories(categories)}
          defaultExpandAll
          onClick={(e) => {

          }}
        />
      ) : (<Empty />)}
    </>
  )
};

export default CategoryTree;