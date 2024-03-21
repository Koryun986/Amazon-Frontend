"use client"

import {Button, Flex, Form, Input, Popconfirm, Space, Switch} from "antd";
import {IProduct} from "../../types/IProduct";
import {FC, useState} from "react";

interface ProductFormProps {
    product?: IProduct;
}

const ProductForm: FC<ProductFormProps> = ({product}) => {
    const [localProduct, setLocalProduct] = useState<Omit<IProduct, "id" | "main_image" | "images" | "owner" | "total_earnings" | "time_bought">>(product || {
        name: "",
        description: "",
        brand: "",
        price: 0,
        color: "",
        size: "",
        category: "",
        is_published: false,
    });
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="UserForm"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 20,
            }}
            style={{
                maxWidth: 600,
            }}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                initialValue={localProduct.name}
                rules={[
                    {
                        required: true,
                        message: 'Please input product name!',
                    },
                ]}
            >
                <Input name="name" value={localProduct.name} onChange={handleInputChange}/>
            </Form.Item>

            <Form.Item
                label="Brand"
                name="brand"
                initialValue={localProduct.brand}
                rules={[
                    {
                        required: true,
                        message: 'Please input brands name!',
                    },
                ]}

            >
                <Input name="brand" value={localProduct.brand} onChange={handleInputChange}/>
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                initialValue={localProduct.price}
                rules={[
                    {
                        required: true,
                        message: 'Please input price!',
                    },
                    {
                        type: "number"
                    }
                ]}
            >
                <Input name="price" value={localProduct.price} onChange={handleInputChange}/>
            </Form.Item>

            <Form.Item
                label="Zip Code"
                name="zip_code"
                initialValue={localAddress.zip_code}
                rules={[
                    {
                        required: true,
                        message: 'Please input zip code!',
                    },
                ]}
            >
                <Input name="zip_code" value={localAddress.zip_code} onChange={handleInputChange}/>
            </Form.Item>

            <Form.Item
                label="Street Address"
                name="street_address"
                initialValue={localAddress.street_address}
                rules={[
                    {
                        required: true,
                        message: 'Please input street address!',
                    },
                ]}
            >
                <Input name="street_address" value={localAddress.street_address} onChange={handleInputChange}/>
            </Form.Item>

            <Space direction="vertical" className="mb-4">
                <div>Is Main Address</div>
                <Switch defaultValue={localAddress.is_default_address} onChange={(checked => setLocalAddress(prevState => ({...prevState, is_default_address: checked})))} />
            </Space>

            <Flex justify={"space-between"}>
                <Space>
                    <Button htmlType="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleSubmitButtonClick}>
                        {address ? "Edit" : "Add"}
                    </Button>
                </Space>
                {!!address && (
                    <Popconfirm
                        title="Delete the address"
                        description="Are you sure to delete this address?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={handleDeleteAddress}
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                )}
            </Flex>
        </Form>
    )
};

export default ProductForm;