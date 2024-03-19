"use client"
import Link from "next/link";
import Image from "next/image";
import {Avatar, Button, Card, Divider} from "antd";
import {ApiConstants} from "../api/api-constants";
import {HeartFilled, HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {useAppSelector} from "../hooks/store-hooks";
import useFavorites from "../hooks/favorite-hooks";
import type {IProduct} from "../types/IProduct";

interface ProductItemProps {
    product: IProduct;
}

const ProductItem = ({product}: ProductItemProps) => {
    const favorites = useAppSelector(state => state.favorites.favorites);
    const {addFavorite, removeFavorite} = useFavorites();
    const isFavorite = favorites.includes(product.id);

    const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isFavorite) {
            await removeFavorite(product.id);
            return;
        }
        await addFavorite(product.id);
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
                    <Button onClick={toggleFavorite}>{!isFavorite ? <HeartOutlined style={{fontSize: "20px"}}/> : <HeartFilled style={{fontSize: "20px"}} />}</Button>
                    <Button><ShoppingCartOutlined style={{fontSize: "20px"}} /></Button>
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