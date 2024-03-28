"use client"
import {FC} from "react";
import {Button, Flex, Form, Input, message, Space, Switch} from "antd";
import {editProduct} from "../../api/requests/product-requests";

interface EditProductFormProps {
  onCancel: () => void;
  onSubmit: () => void;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    is_published: boolean;
  }
}

const EditProductForm: FC<EditProductFormProps> = ({product, onCancel, onSubmit}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (data) => {
    try {
      await editProduct({...data, id: product.id});
      onSubmit();
      onCancel();
      message.success("Product has been successfully edited")
    } catch (e) {
      message.error("Oops Something went wrong");
    }
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

export default EditProductForm;