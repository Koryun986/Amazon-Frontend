import {Suspense} from "react";
import {Metadata} from "next";
import {getProductById} from "../../../api/requests/product-requests";
import {AxiosResponse} from "axios";
import type {IProduct} from "../../../types/IProduct";
import ProductItemPage from "../../../components/ProductItemPage";
import {Spin} from "antd";

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

    return (
        <Suspense fallback={<div className="h-screen flex justify-center items-center"><Spin /></div>}>
          {!!product && <ProductItemPage product={product} /> }
        </Suspense>
    )
}