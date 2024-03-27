import {Suspense} from "react";
import {Metadata} from "next";
import {getProductById} from "../../../api/requests/product-requests";
import {AxiosResponse} from "axios";
import type {IProduct} from "../../../types/IProduct";
import {Avatar, Spin} from "antd";
import FloatGoBackButton from "../../../shared/FloatGoBackButton";
import ProductImageGroup from "./_components/ProductImageGroup";
import ProductFavoriteButton from "../../../components/ProductFavoriteButton";
import ProductCartItemButton from "../../../components/ProductCartItemButton";

export async function generateMetadata({params: {id}}: {params: {id: string}}): Promise<Metadata> {
    const {data: product}: AxiosResponse<IProduct> = await getProductById(id);
    return {
        title: `${product.name} | Amazon`,
        description: product.description,
        openGraph: {
            title: `${product.name} | Amazon`,
            description: product.description,
            image: product.images.find(image => image.is_main_image).image_url,
        }
    }
}

export default async function Page({params: {id}}: { params: { id: string }}) {
    const {data: product}: AxiosResponse<IProduct> = await getProductById(id);

    const main_image = product.images.find(image => image.is_main_image)?.image_url;
    const images = product.images.filter(image => !image.is_main_image).map(image => image.image_url);


    return (
        <Suspense fallback={<div className="h-screen flex justify-center items-center"><Spin /></div>}>
            <div className="container mx-auto px-4 md:px-0">
                <FloatGoBackButton />
                <div className="h-screen py-10">
                    <div className="md:h-[40%] grid gap-4 md:grid-cols-4 grid-cols-2 grid-rows-2">
                        <ProductImageGroup main_image={main_image} images={images} />
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
        </Suspense>
    )
}