"use client"

import {FC, useEffect, useState} from "react";
import {Button, Flex, Form, Input, Select, Space, Switch, TreeDataNode, TreeSelect, Upload} from "antd";
import type {IColor} from "../../types/IColor";
import type {ISize} from "../../types/ISize";
import type {ICategory} from "../../types/ICategory";
import {AxiosResponse} from "axios";
import {getColors} from "../../api/requests/color-request";
import {getSizes} from "../../api/requests/size-requests";
import {getAllCategories} from "../../api/requests/category-request";
import transformCategories from "../../helpers/transform-categories";
import {PlusOutlined} from "@ant-design/icons";
import {addProduct} from "../../api/requests/product-requests";

interface ProductFormProps {
    onCancel: () => void;
}

const ProductForm: FC<ProductFormProps> = ({onCancel}) => {
  const [error, setError] = useState(null);
  const [colors, setColors] = useState<IColor[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [form] = Form.useForm();

  const fetchColors = async () => {
    try {
      const {data: colors}: AxiosResponse<IColor[]> = await getColors();
      setColors(colors);
    } catch (e) {
      setError(e);
    }
  }

  const fetchSizes = async () => {
    try {
      const { data: sizes }: AxiosResponse<ISize[]> = await getSizes();
      setSizes(sizes);
    } catch (e) {
      setError(e);
    }
  }

  const fetchCategories = async () => {
    try {
      const { data: categories }: AxiosResponse<ICategory[]> = await getAllCategories();
      setCategories(categories);
    } catch (e) {
      setError(e);
    }
  }

  const callFetches = async () => {
    await fetchColors();
    await fetchSizes();
    await fetchCategories();
  }

  useEffect(() => {
    callFetches();
  }, []);

  const getFormDataFromObject = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("brand", data.brand);
    formData.append("price", data.price);
    formData.append("color", data.color);
    formData.append("size", data.size);
    formData.append("category", data.category);
    formData.append("is_published", data.is_published);
    formData.append("main-image", data["main-image"].fileList[0].originFileObj);
    if (data.images) {
      for(const image of data.images?.fileList) {
        formData.append("images", image.originFileObj);
      }
    }
    return formData;
  }

  const handleSubmit = async (data) => {
    const formData = getFormDataFromObject(data);
    try {
      await addProduct(formData);
      onCancel();
    } catch (e) {
      setError(e);
      console.log(e)
    }
  }

  if (error) {
    return (
      <div>Oops something went wrong</div>
    )
  }

  return (
    <Form
        form={form}
        name="UserForm"
        labelCol={{
            span: 6,
        }}
        style={{
            maxWidth: 600,
        }}
        autoComplete="off"
        onFinish={handleSubmit}
    >
        <Form.Item
            label="Name"
            name="name"
            rules={[
                {
                    required: true,
                    message: 'Please input product name!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Brand"
            name="brand"
            rules={[
                {
                    required: true,
                    message: 'Please input brands name!',
                },
            ]}

        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Price"
            name="price"
            rules={[
                {
                    required: true,
                    message: 'Please input price!',
                },
            ]}
        >
            <Input type={"number"} />
        </Form.Item>

        <Form.Item
            label="Description"
            name="description"
            rules={[
                {
                    required: true,
                    message: 'Please input description!',
                },
            ]}
        >
            <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Color"
          name="color"
          rules={[
            {
              required: true,
              message: "Please select color!"
            }
          ]}
        >
          <Select>
            {colors.map(color => <Select.Option value={color.name} key={color.id}>{color.name}</Select.Option> )}
          </Select>
        </Form.Item>

      <Form.Item
        label="Size"
        name="size"
        rules={[
          {
            required: true,
            message: "Please select size!"
          }
        ]}
      >
        <Select>
          {sizes.map(size => <Select.Option value={size.name} key={size.id}>{size.name}</Select.Option> )}
        </Select>
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Please select category!"
          }
        ]}
      >
        <TreeSelect
          treeData={transformCategories(categories)}
        />
      </Form.Item>

      <Form.Item
        name="main-image"
        label="Main Image"
        rules={[
          {
            required: true,
            message: "Please upload main image"
          }
        ]}
      >
        <Upload listType="picture-card" maxCount={1} multiple={false}>
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>

      <Form.Item name="images" label="Additional Images">
        <Upload listType="picture-card" maxCount={4} multiple>
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="is_published"
        label="Is Published"
      >
        <Switch />
      </Form.Item>

        <Flex justify={"space-between"}>
          <Space>
            <Button htmlType="button" onClick={onCancel}>
                Cancel
            </Button>
            <Button type="primary" htmlType="submit">
                Add
            </Button>
          </Space>
        </Flex>
    </Form>
  )
};

export default ProductForm;