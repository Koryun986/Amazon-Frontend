"use client"
import Link from "next/link";
import Image from "next/image";
import {Avatar, Button, Card, Divider, Space} from "antd";
import {ApiConstants} from "../api/api-constants";
import {HeartFilled, HeartOutlined, MinusCircleFilled, PlusCircleFilled, ShoppingCartOutlined} from "@ant-design/icons";
import {useAppSelector} from "../hooks/store-hooks";
import useFavorites from "../hooks/favorite-hooks";
import type {IProduct} from "../types/IProduct";
import useCartItems from "../hooks/cart-item-hooks";
import boolean from "async-validator/dist-types/validator/boolean";
import {useEffect, useState} from "react";

interface ProductItemProps {
    product: IProduct;
}

const ProductItem = ({product}: ProductItemProps) => {
    const favorites = useAppSelector(state => state.favorites.favorites);
    const { toggleFavorite } = useFavorites();
    const { addCartItem, removeCartItem, setCartItem, cartItemCount } = useCartItems(product.id);
    const isFavorite = favorites.includes(product.id)

    const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await toggleFavorite(product.id);
    }

    const handleIncrease = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addCartItem();
    }

    const handleDecrease = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        removeCartItem();
    }

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await setCartItem();
    }

    return (
        <Link href={`/products/${product.id}`}>
            <Card
                size="small"
                cover={
                    <Image
                        src={ApiConstants.PUBLIC_ASSETS_URL+product.main_image}
                        alt="Product Photo"
                        width={0}
                        height={0}
                        unoptimized={true}
                        priority
                        className="w-full aspect-video"
                    />
                }
            >
                <div className="flex justify-between items-center mb-4">
                    <Button onClick={handleToggleFavorite}>{!isFavorite ? <HeartOutlined style={{fontSize: "20px"}}/> : <HeartFilled style={{fontSize: "20px"}} />}</Button>
                    <Space direction={"vertical"} align={"center"}>
                        <div className="flex gap-4">
                            <MinusCircleFilled style={{fontSize: "20px"}} onClick={handleDecrease}/>
                            <div>{cartItemCount}</div>
                            <PlusCircleFilled style={{fontSize: "20px"}} onClick={handleIncrease}/>
                        </div>
                        <Button onClick={handleAddToCart}>Add to Cart</Button>
                    </Space>
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