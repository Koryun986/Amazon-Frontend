"use client"
import {Button, Card, Descriptions, message, Popconfirm, Space, Tag} from "antd";
import Image from "next/image";
import {FC} from "react";
import {ApiConstants} from "../../../../api/api-constants";
import {deleteProduct} from "../../../../api/requests/product-requests";
import type {IProduct} from "../../../../types/IProduct";
import EditProductButton from "./EditProductButton";

interface AccountProductItemProps {
    product: IProduct;
    onEdit: (product: IProduct) => void;
    onChange: () => void;
}

const AccountProductItem: FC<AccountProductItemProps> = ({product, onEdit, onChange}) => {
    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(product.id);
            onChange();
            message.success("Product has been successfully deleted");
        } catch (e) {
            message.error("Oops Something went wrong");
        }
    }

    return (
        <Card>
            <div className="flex flex-col items-center  sm:flex-row h-full gap-4 ">
                <div className="inline min-w-[300px]">
                    <Image
                        src={ApiConstants.PUBLIC_ASSETS_URL+product.main_image.image_url}
                        alt="Product Photo"
                        width={0}
                        height={0}
                        unoptimized
                        priority
                        className="h-[200px] w-auto mx-auto"
                    />
                </div>
                <div>
                    <div className="text-lg font-bold">{product.name}</div>
                    <Descriptions column={3} size={"small"} contentStyle={{fontSize: "20px"}} labelStyle={{fontSize: "16px", verticalAlign: "middle"}}>
                        <Descriptions.Item label={"Price"}>{product.price}$</Descriptions.Item>
                        <Descriptions.Item label={"Brand"}>{product.brand}</Descriptions.Item>

                        <Descriptions.Item label={"Category"}>{product.category.name}</Descriptions.Item>
                        <Descriptions.Item label={"Time Bought"}>{product.time_bought}</Descriptions.Item>
                        <Descriptions.Item label={"Total Earnings"}>${product.total_earnings}</Descriptions.Item>
                        <Descriptions.Item label={"Is Published"}>{product.is_published ? "Yes": "No"}</Descriptions.Item>
                    </Descriptions>
                    <div className="mt-4">
                        Colors
                        <div className="font-semibold">{product.colors.map((color) => <Tag key={color.name}>{color.name}</Tag>)}</div>
                    </div>
                    <div className="mt-4">
                        Size
                        <div className="font-semibold">{product.sizes.map(size => <Tag key={size.name}>{size.name}</Tag>)}</div>
                    </div>
                </div>
                <Space direction={"vertical"}>
                    <EditProductButton onEdit={onChange} product={product} />
                    <Popconfirm
                        title="Delete the product"
                        description="Are you sure to delete this product?"
                        onConfirm={handleDeleteProduct}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            </div>
        </Card>
    )
};

export default AccountProductItem;