"use client"
import {Button, Card, Descriptions, Popconfirm, Space} from "antd";
import Image from "next/image";
import {IProduct} from "../../../../types/IProduct";
import {FC} from "react";
import {ApiConstants} from "../../../../api/api-constants";
import {deleteProduct} from "../../../../api/requests/product-requests";

interface AccountProductItemProps {
    product: IProduct;
    onEdit: (product: IProduct) => void;
    onChange: () => void;
}

const AccountProductItem: FC<AccountProductItemProps> = ({product, onEdit, onChange}) => {
    const mainImage = product.images.find(image => image.is_main_image)?.image_url;

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(product.id);
            onChange();
        } catch (e) {

        }
    }

    return (
        <Card>
            <div className="flex flex-col items-center  sm:flex-row h-full gap-4 ">
                <Image
                    src={ApiConstants.PUBLIC_ASSETS_URL+mainImage}
                    alt="Product Photo"
                    width={0}
                    height={0}
                    unoptimized={true}
                    priority
                    className="h-[200px] w-[300px]"
                />
                <div>
                    <div className="text-lg font-bold">{product.name}</div>
                    <Descriptions column={3} size={"small"} contentStyle={{fontSize: "20px"}} labelStyle={{fontSize: "16px", verticalAlign: "middle"}}>
                        <Descriptions.Item label={"Price"}>{product.price}$</Descriptions.Item>
                        <Descriptions.Item label={"Brand"}>{product.brand}</Descriptions.Item>
                        <Descriptions.Item label={"Color"}>{product.color.name}</Descriptions.Item>
                        <Descriptions.Item label={"Size"}>{product.size.name}</Descriptions.Item>
                        <Descriptions.Item label={"Category"}>{product.category.name}</Descriptions.Item>
                        <Descriptions.Item label={"Time Bought"}>{product.time_bought}</Descriptions.Item>
                        <Descriptions.Item label={"Total Earnings"}>${product.total_earnings}</Descriptions.Item>
                    </Descriptions>
                </div>
                <Space direction={"vertical"}>
                    <Button onClick={onEdit}>Edit</Button>
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