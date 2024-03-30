"use client"
import Link from "next/link";
import Image from "next/image";
import {Avatar, Card, Divider} from "antd";
import {ApiConstants} from "../api/api-constants";
import ProductCartItemButton from "./ProductCartItemButton";
import type {IProduct} from "../types/IProduct";
import ProductFavoriteButton from "./ProductFavoriteButton";

interface ProductItemProps {
    product: IProduct;
}

const ProductItem = ({product}: ProductItemProps) => {

    return (
        <Link href={`/products/${product.id}`}>
            <Card
                size="small"
                cover={
                    <Image
                        src={ApiConstants.PUBLIC_ASSETS_URL+product.main_image.image_url}
                        alt="Product Photo"
                        width={0}
                        height={0}
                        unoptimized={true}
                        priority
                        className="w-full aspect-video object-contain"
                    />
                }
            >
                <div className="flex justify-between items-center mb-4">
                    <ProductFavoriteButton id={product.id} />
                    <ProductCartItemButton id={product.id} />
                </div>
                <div className="text-lg font-bold">{product.name}</div>
                <div className="flex gap-4 justify-between items-center">
                    <div className="text-md">Price<div className="font-semibold">${product.price}</div></div>
                    <div className="text-md">Brand<div className="font-semibold">{product.brand}</div></div>
                </div>
                <div className="text-gray-600 truncate">{product.description}</div>
                <Divider />
                <div className="flex gap-4 align-center">
                    <Avatar style={{backgroundColor: "#001529", verticalAlign: "middle"}} size="large">{product.owner.first_name}</Avatar>
                    <div>
                        <div className="text-md font-semibold">{product.owner.first_name} {product.owner.last_name}</div>
                        <div>{product.owner.email}</div>
                    </div>
                </div>
            </Card>
        </Link>
    )
};

export default ProductItem;