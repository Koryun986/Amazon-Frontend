"use client"
import {Avatar, Button, Card, Descriptions, Divider, Popconfirm, Space} from "antd";
import Image from "next/image";
import {IProduct} from "../../../types/IProduct";
import {FC} from "react";
import {ApiConstants} from "../../../api/api-constants";

interface AccountProductItemProps {
    product: IProduct
    onEdit: (product: IProduct) => void;
}

const AccountProductItem: FC<AccountProductItemProps> = ({product, onEdit}) => {
    return (
        <Card>
            <div className="flex flex-col items-center  sm:flex-row h-full gap-4 ">
                <Image
                    src={ApiConstants.PUBLIC_ASSETS_URL+product.main_image}
                    alt="Product Photo"
                    width={0}
                    height={0}
                    unoptimized={true}
                    priority
                    className="h-[200px] w-[300px]"
                />
                <div>
                    <div className="text-lg font-bold">{product.name}</div>
                    <Descriptions column={2} size={"small"} contentStyle={{fontSize: "20px"}} labelStyle={{fontSize: "16px"}}>
                        <Descriptions.Item label={"Price"}>{product.price}$</Descriptions.Item>
                        <Descriptions.Item label={"Brand"}>{product.brand}</Descriptions.Item>
                        <Descriptions.Item label={"Color"}>{product.color}</Descriptions.Item>
                        <Descriptions.Item label={"Size"}>{product.size}</Descriptions.Item>
                        <Descriptions.Item label={"Category"}>{product.category}</Descriptions.Item>

                    </Descriptions>
                </div>
                <Space direction={"vertical"}>
                    <Button onClick={onEdit}>Edit</Button>
                    <Popconfirm
                        title="Delete the product"
                        description="Are you sure to delete this product?"
                        // onConfirm={confirm}
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