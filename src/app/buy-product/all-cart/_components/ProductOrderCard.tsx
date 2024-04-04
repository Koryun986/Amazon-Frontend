import type {IProduct} from "../../../../types/IProduct";
import {FC} from "react";
import {Card} from "antd";
import {ApiConstants} from "../../../../api/api-constants";
import Image from "next/image";

interface ProductOrderCartProps {
  product: IProduct & {count: number}
}

const ProductOrderCard: FC<ProductOrderCartProps> = ({product}) => {
  return (
    <Card>
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 w-[80%]">
          <Image
            src={ApiConstants.PUBLIC_ASSETS_URL+product.main_image.image_url}
            alt="Product Photo"
            width={0}
            height={0}
            unoptimized
            priority
            className="w-[30%] aspect-video object-contain"
          />
          <div className="h-full">
            <div className="text-lg font-bold">{product.name}</div>
            <div className="text-lg">Price: <span className="font-bold">${product.price}</span></div>
            <div className="text-lg">Count: <span className="font-bold">{product.count}</span></div>
          </div>
        </div>
          <div className="text-lg text-center">Subtotal<div className="font-bold">${product.price * product.count}</div></div>
      </div>
    </Card>
  )
};

export default ProductOrderCard;