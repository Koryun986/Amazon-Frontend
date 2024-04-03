import {FC} from "react";
import Image from "next/image";
import {Card, Divider} from "antd";
import {ApiConstants} from "../../../api/api-constants";
import type {IProduct} from "../../../types/IProduct";

interface ProductOrderCardProps {
  product: IProduct & {count: number, amount: number};
}

const ProductOrderCard: FC<ProductOrderCardProps> = ({product}) => {
  return (
    <Card
      size="small"
      cover={
        <Image
          src={ApiConstants.PUBLIC_ASSETS_URL+product.main_image.image_url}
          alt="Product Photo"
          width={0}
          height={0}
          unoptimized={true}
          priority
          className="w-full aspect-video object-contain"
        />
      }
    >
      <div className="text-lg font-bold">{product.name}</div>
      <div className="text-md">Price<div className="font-semibold">${product.price}</div></div>
      <div className="text-md">Count<div className="font-semibold">{product.count}</div></div>
      <Divider />
      <div className="text-lg">Amount <div className="font-bold">{(product.amount / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</div></div>
    </Card>
  )
};

export default ProductOrderCard;