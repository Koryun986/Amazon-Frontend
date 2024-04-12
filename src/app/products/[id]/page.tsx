import {Suspense} from "react";
import {Metadata} from "next";
import {getProductById} from "../../../api/requests/product-requests";
import {AxiosResponse} from "axios";
import type {IProduct} from "../../../types/IProduct";
import {Avatar, Button, Spin, Tag} from "antd";
import FloatGoBackButton from "../../../shared/FloatGoBackButton";
import ProductImageGroup from "./_components/ProductImageGroup";
import ProductFavoriteButton from "../../../components/ProductFavoriteButton";
import ProductCartItemButton from "../../../components/ProductCartItemButton";
import Link from "next/link";

export async function generateMetadata({params: {id}}: {params: {id: string}}): Promise<Metadata> {
    const {data: product}: AxiosResponse<IProduct> = await getProductById(id);
    return {
        title: `${product.name} | Amazon`,
        description: product.description,
        openGraph: {
            title: `${product.name} | Amazon`,
            description: product.description,
            image: product.main_image.image_url,
        }
    }
}

export default async function Page({params: {id}}: { params: { id: string }}) {
    const {data: product}: AxiosResponse<IProduct> = await getProductById(id);

    return (
        <Suspense fallback={<div className="h-screen flex justify-center items-center"><Spin /></div>}>
            <div className="container mx-auto px-4 md:px-0">
                <FloatGoBackButton />
                <div className="h-screen py-10">
                    <div className="md:h-[40%] grid gap-4 md:grid-cols-4 grid-cols-2 grid-rows-2">
                        <ProductImageGroup main_image={product.main_image.image_url} images={product.images} />
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <ProductFavoriteButton id={product.id} />
                            <ProductCartItemButton id={product.id} />
                        </div>
                        <Link href={`/subscriptions/product?id=${product.id}`}>
                            <Button>Buy Subscription</Button>
                        </Link>
                        <div className="text-xl font-bold mt-4">{product.name}</div>
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
                                    Colors
                                    <div className="font-semibold">{product.colors.map((color) => <Tag>{color.name}</Tag>)}</div>
                                </div>
                                <div className="mt-4">
                                    Size
                                    <div className="font-semibold">{product.sizes.map(size => <Tag>{size.name}</Tag>)}</div>
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
