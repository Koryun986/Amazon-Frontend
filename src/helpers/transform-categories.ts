import type {ICategory} from "../types/ICategory";

export default function transformCategories(categories: ICategory[]) {
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