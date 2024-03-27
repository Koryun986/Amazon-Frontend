"use client"

import CategoryAddButton from "./CategoryAddButton";
import {useEffect, useState} from "react";
import type {ICategory} from "../../../../types/ICategory";
import {getAllCategories} from "../../../../api/requests/category-request";
import {Button, Empty, Tree} from "antd";
import transformCategories, {transformCategoriesWithCustomTitle} from "../../../../helpers/transform-categories";

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
          treeData={transformCategoriesWithCustomTitle(categories, (category) => (
            <div className="flex gap-4">
              <span>{category.name}</span>
              <Button>Edit</Button>
              <Button danger>Delete</Button>
            </div>
            ))}
          defaultExpandAll
        />
      ) : (<Empty />)}
    </>
  )
};

export default CategoryTree;