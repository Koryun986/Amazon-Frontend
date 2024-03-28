"use client"

import {FC} from "react";
import {Button, Flex, Form, Input, message, Popconfirm, Space, TreeSelect} from "antd";
import type {ICategory} from "../../types/ICategory";
import transformCategories from "../../helpers/transform-categories";
import {NamePath} from "rc-field-form/es/interface";
import {createCategory, deleteCategory, updateCategory} from "../../api/requests/category-request";

interface CategoryFormProps {
  category?: ICategory;
  categories: ICategory[];
  formType: "add" | "edit";
  onSubmit: () => void;
  onCancel: () => void;
}

const CategoryForm: FC<CategoryFormProps> = ({category, categories, formType, onCancel, onSubmit}) => {
  const [form] = Form.useForm();

  const handleSubmitButtonClick = async (data: {name: string, parent_id: number}) => {
    try {
      if (formType === "edit")  {
        await updateCategory({name: data.name, parent_id: typeof data.parent_id !== "number" ? null : data.parent_id, id: category?.id!});
      } else {
        await createCategory(data);
      }
      onSubmit();
      message.success(`Category has been successfully ${formType === "add" ? 'added' : "edited"}`)
    } catch (e) {
      message.error("Oops something went wrong");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(category?.id!)
      onSubmit();
      message.success("Category has been successfully deleted");
    } catch (e) {
      message.error("Oops something went wrong");
    }
  }

  const getParentOfCurrent = (categories: ICategory[]) => {
    for(const categoryItem of categories) {
      if (categoryItem.children.find(item => item.id === category?.id)) {
        return categoryItem;
      }
      const parent= getParentOfCurrent(categoryItem.children);
      if (parent) {
        return parent;
      }
    }
    return null;
  }

  const isCategoryChildOfCurrent = (mainCategory: ICategory[], checkedCategoryId: number) => {
    for(const childItem of category?.children) {
      if (childItem.id === checkedCategoryId) {
        return true;
      }
      const isChildOfChild = isCategoryChildOfCurrent(childItem.children, checkedCategoryId);
      if (isChildOfChild) {
        return true;
      }
    }
    return false;
  }

  return (
    <Form
      form={form}
      name="Category Form"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
      onFinish={handleSubmitButtonClick}
    >
      <Form.Item
        label="Category Name"
        name="name"
        initialValue={category?.name || ""}
        rules={[
          {
            required: true,
            message: 'Please input category name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Parent"
        name="parent_id"
        initialValue={category ? getParentOfCurrent(categories)?.id : null}
        rules={category ? [
          ({getFieldValue}) => ({
          validator(_, value) {
            if (getFieldValue("parent_id" as NamePath) === category?.id) {
              return Promise.reject(new Error("Parent can't be the same category"))
            }
            return Promise.resolve();
          }
          }),
          ({getFieldValue}) => ({
          validator(_, value) {
            if(typeof getFieldValue("parent_id" as NamePath) !== "number") {
              return true;
            }
            if (isCategoryChildOfCurrent(category?.children!, getFieldValue("parent_id" as NamePath))) {
              return Promise.reject(new Error("Parent can't be the lower than child category"))
            }
            return Promise.resolve();
          }
        }),
        ] : []}
      >
        <TreeSelect
          treeData={transformCategories(categories)}
          allowClear
        />
      </Form.Item>

      <Flex justify={"space-between"}>
        <Space>
          <Button htmlType="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {formType === "edit" ? "Edit" : "Add"}
          </Button>
        </Space>
        {formType === "edit" && (
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleDeleteCategory}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        )}
      </Flex>
    </Form>
  );
};

export default CategoryForm;