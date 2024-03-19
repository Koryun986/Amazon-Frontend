"use client"
import Link from "next/link";
import Image from "next/image";
import {Avatar, Button, Card, Divider} from "antd";
import {ApiConstants} from "../api/api-constants";
import {HeartFilled, HeartOutlined, MinusCircleFilled, PlusCircleFilled, ShoppingCartOutlined} from "@ant-design/icons";
import {useAppSelector} from "../hooks/store-hooks";
import useFavorites from "../hooks/favorite-hooks";
import type {IProduct} from "../types/IProduct";
import useCartItems from "../hooks/cart-item-hooks";

interface ProductItemProps {
    product: IProduct;
}

const ProductItem = ({product}: ProductItemProps) => {
    const favorites = useAppSelector(state => state.favorites.favorites);
    const cartItems = useAppSelector(state => state.cart_items.cartItems);
    const { toggleFavorite } = useFavorites();
    const { addCartItem, removeCartItem } = useCartItems();
    const isFavorite = favorites.includes(product.id);

    const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await toggleFavorite(product.id);
    }

    const handleIncrease = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("increase")
        await addCartItem(product.id);
    }

    const handleDecrease = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await removeCartItem(product.id);
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
                        className="w-full aspect-video"
                    />
                }
            >
                <div className="flex justify-between items-center mb-4">
                    <Button onClick={handleToggleFavorite}>{!isFavorite ? <HeartOutlined style={{fontSize: "20px"}}/> : <HeartFilled style={{fontSize: "20px"}} />}</Button>
                    <div className="flex gap-4">
                        <MinusCircleFilled style={{fontSize: "20px"}} onClick={handleDecrease}/>
                        <div>{cartItems.find(cartItem => cartItem.product_id === product.id) ? cartItems.find(cartItem => cartItem.product_id === product.id).count : 0}</div>
                        <PlusCircleFilled style={{fontSize: "20px"}} onClick={handleIncrease}/>
                    </div>
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