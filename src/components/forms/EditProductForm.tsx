"use client"
import {FC, useEffect, useState} from "react";
import {Button, Flex, Form, Input, message, Select, Space, Switch, TreeSelect} from "antd";
import type {AxiosResponse} from "axios";
import {editProduct} from "../../api/requests/product-requests";
import transformCategories from "../../helpers/transform-categories";
import {getColors} from "../../api/requests/color-request";
import {getSizes} from "../../api/requests/size-requests";
import {getAllCategories} from "../../api/requests/category-request";
import type {IProduct} from "../../types/IProduct";
import type {IColor} from "../../types/IColor";
import type {ISize} from "../../types/ISize";
import type {ICategory} from "../../types/ICategory";

const { Option } = Select;

interface EditProductFormProps {
  onCancel: () => void;
  onSubmit: () => void;
  product: IProduct;
}

const EditProductForm: FC<EditProductFormProps> = ({product, onCancel, onSubmit}) => {
  const [error, setError] = useState(null);
  const [colors, setColors] = useState<IColor[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [form] = Form.useForm();

  const fetchColors = async () => {
    const {data: colors}: AxiosResponse<IColor[]> = await getColors();
    setColors(colors);
  }

  const fetchSizes = async () => {
    const { data: sizes }: AxiosResponse<ISize[]> = await getSizes();
    setSizes(sizes);
  }

  const fetchCategories = async () => {
    const { data: categories }: AxiosResponse<ICategory[]> = await getAllCategories();
    setCategories(categories);
  }

  const callFetches = async () => {
    try {
      await fetchColors();
      await fetchSizes();
      await fetchCategories();
    } catch (e) {
      setError(e);
      message.error("Oops something went wrong");
    }
  }

  useEffect(() => {
    callFetches();
  }, []);


  const handleSubmit = async (data) => {
    try {
      const editedData: {id: number, name: string, description: string, price: number, colors: string[], sizes: string[], category: number, is_published: boolean} = {
        id: product.id,
        name: data.name,
        description: data.description,
        price: data.price,
        colors: data.edited_colors,
        sizes: data.edited_sizes,
        category: data.edited_category,
        is_published: data.is_published
      };
      await editProduct(editedData);
      onSubmit();
      onCancel();
      message.success("Product has been successfully edited")
    } catch (e) {
      message.error("Oops Something went wrong");
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
      name="Edit Product Form"
      labelCol={{
        span: 6,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={product}
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
        label="Colors"
        name="edited_colors"
        initialValue={product.colors.map(color => color.name)}
        rules={[{ required: true, message: 'Please select colors!', type: 'array' }]}
      >
        <Select mode="multiple" placeholder="Please select colors">
          {colors.map(color => (<Option key={color.name} value={color.name}>{color.name}</Option> ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Sizes"
        name="edited_sizes"
        initialValue={product.sizes.map(size => size.name)}
        rules={[{ required: true, message: 'Please select sizes!', type: 'array' }]}
      >
        <Select mode="multiple" placeholder="Please select sizes">
          {sizes.map(size => (<Option key={size.name} value={size.name}>{size.name}</Option> ))}
        </Select>
      </Form.Item>


      <Form.Item
        label="Category"
        name="edited_category"
        initialValue={product.category.id}
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
            Edit
          </Button>
        </Space>
      </Flex>
    </Form>
  )
};

export default EditProductForm;