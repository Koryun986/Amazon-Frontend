import {Metadata} from "next";
import {getProductById} from "../../../api/requests/product-requests";
import {AxiosResponse} from "axios";
import type {IProduct} from "../../../types/IProduct";
import ProductItemPage from "../../../components/ProductItemPage";
import {Spin} from "antd";

let product: IProduct;

export async function generateMetadata({params: {id}}: {params: {id: string}}): Promise<Metadata> {
    const {data}: AxiosResponse<IProduct> = await getProductById(id);
    product = data;
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
    if (!product) {
        return (
          <div className="h-screen flex justify-center items-center"><Spin /></div>
        )
    }
    return (
        <>
          {!!product && <ProductItemPage product={product} /> }
        </>
    )
}