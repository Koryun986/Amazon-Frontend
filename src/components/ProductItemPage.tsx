"use client"
import {FC} from "react";
import {useRouter} from "next/navigation";
import {Avatar, Button, FloatButton, Image} from "antd";
import {ApiConstants} from "../api/api-constants";
import type {IProduct} from "../types/IProduct";
import {
    HeartFilled,
    HeartOutlined,
    LeftOutlined,
    MinusCircleFilled,
    PlusCircleFilled,
    ShoppingCartOutlined
} from "@ant-design/icons";
import {useAppSelector} from "../hooks/store-hooks";
import useFavorites from "../hooks/favorite-hooks";
import useCartItems from "../hooks/cart-item-hooks";

const {PreviewGroup} = Image;

interface ProductItemPageProps {
    product: IProduct;
}

const ProductItemPage: FC<ProductItemPageProps> = ({product}) => {
    const favorites = useAppSelector(state => state.favorites.favorites);
    const cartItems = useAppSelector(state => state.cart_items.cartItems);
    const { toggleFavorite } = useFavorites();
    const { addCartItem, removeCartItem } = useCartItems();
    const isFavorite = favorites.includes(product.id);
    const router = useRouter();

    const handleGoBack = () => {
        router.push("/");
    }

    const handleIncrease = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await addCartItem(product.id);
    }

    const handleDecrease = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await removeCartItem(product.id);
    }

    return (
        <div className="container mx-auto px-4 md:px-0">
            <FloatButton shape={"circle"} icon={<LeftOutlined />} onClick={handleGoBack} />
            <div className="h-screen py-10">
                <div className="md:h-[40%] grid gap-4 md:grid-cols-4 grid-cols-2 grid-rows-2">
                    <PreviewGroup>
                        <div className="col-start-1 col-span-2 row-start-1 row-span-2">
                            <Image width={"100%"} height={"100%"} src={ApiConstants.PUBLIC_ASSETS_URL+product.main_image} alt={"Product Image"} />
                        </div>
                        {!!product.images.length && product.images.map(image => (
                            <div className="h-full row-span-1"><Image width={"100%"} height={"100%"} className="mx-auto" src={ApiConstants.PUBLIC_ASSETS_URL+image} /></div>
                        ))}
                    </PreviewGroup>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <Button onClick={() => toggleFavorite(product.id)}>{!isFavorite ? <HeartOutlined style={{fontSize: "20px"}}/> : <HeartFilled style={{fontSize: "20px"}} />}</Button>
                        <div className="flex gap-4">
                            <MinusCircleFilled style={{fontSize: "20px"}} onClick={handleDecrease}/>
                            <div>{cartItems.find(cartItem => cartItem.product_id === product.id) ? cartItems.find(cartItem => cartItem.product_id === product.id).count : 0}</div>
                            <PlusCircleFilled style={{fontSize: "20px"}} onClick={handleIncrease}/>
                        </div>
                    </div>
                    <div className="text-xl font-bold">{product.name}</div>
                    <div className="mt-5 grid md:grid-cols-2 grid-cols-1">
                        <div>
                            <span className="font-semibold">Description</span>
                            <div className=" text-gray-400">{product.description}</div>
                        </div>
                        <div>
                            <div>
                                Brand
                                <div className="font-semibold">{product.brand}</div>
                            </div>
                            <div className="mt-4">
                                Color
                                <div className="font-semibold">{product.color}</div>
                            </div>
                            <div className="mt-4">
                                Size
                                <div className="font-semibold">{product.size}</div>
                            </div>
                            <div className="mt-4">
                                Category
                                <div className="font-semibold">{product.category}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 align-center mt-4">
                        <Avatar style={{backgroundColor: "#001529", verticalAlign: "middle"}} size="large">{product.owner.first_name}</Avatar>
                        <div>
                            <div className="text-md font-semibold">{product.owner.first_name} {product.owner.last_name}</div>
                            <div>{product.owner.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItemPage;