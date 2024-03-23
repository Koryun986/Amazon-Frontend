"use client"
import {FC} from "react";
import {useRouter} from "next/navigation";
import {Avatar, FloatButton, Image} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import {ApiConstants} from "../api/api-constants";
import type {IProduct} from "../types/IProduct";
import ProductFavoriteButton from "./ProductFavoriteButton";
import ProductCartItemButton from "./ProductCartItemButton";

const {PreviewGroup} = Image;

interface ProductItemPageProps {
    product: IProduct;
}

const ProductItemPage: FC<ProductItemPageProps> = ({product}) => {
    const main_image = product.images.find(image => image.is_main_image)?.image_url;
    const images = product.images.filter(image => !image.is_main_image);
    const router = useRouter();

    const handleGoBack = () => {
        router.push("/");
    }

    return (
        <div className="container mx-auto px-4 md:px-0">
            <FloatButton shape={"circle"} icon={<LeftOutlined />} onClick={handleGoBack} />
            <div className="h-screen py-10">
                <div className="md:h-[40%] grid gap-4 md:grid-cols-4 grid-cols-2 grid-rows-2">
                    <PreviewGroup>
                        <div className="col-start-1 col-span-2 row-start-1 row-span-2">
                            <Image width={"100%"} height={"100%"} src={ApiConstants.PUBLIC_ASSETS_URL+main_image} alt={"Product Image"} />
                        </div>
                        {!!images.length && product.images.map((image, index) => (
                            <div className="h-full row-span-1" key={index}><Image width={"100%"} height={"100%"} className="mx-auto" src={ApiConstants.PUBLIC_ASSETS_URL+image.image_url} /></div>
                        ))}
                    </PreviewGroup>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <ProductFavoriteButton id={product.id} />
                        <ProductCartItemButton id={product.id} />
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
                                <div className="font-semibold">{product.color.name}</div>
                            </div>
                            <div className="mt-4">
                                Size
                                <div className="font-semibold">{product.size.name}</div>
                            </div>
                            <div className="mt-4">
                                Category
                                <div className="font-semibold">{product.category.name}</div>
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