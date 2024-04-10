import {FC} from "react";
import {Card} from "antd";
import Image from "next/image";
import {ApiConstants} from "../../../api/api-constants";
import type {IProduct} from "../../../types/IProduct";

interface OrderItemProps {
  order: IProduct & {count: number, date: number, status: string};
}

const OrderItem: FC<OrderItemProps> = ({order: product}) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div className="flex gap-4 w-[40%]">
          <Image
            src={ApiConstants.PUBLIC_ASSETS_URL+product.main_image.image_url}
            alt="Product Photo"
            width={0}
            height={0}
            unoptimized
            priority
            className="w-[60%] aspect-video object-contain"
          />
          <div>
            <div className="text-lg font-bold">{product.name}</div>
            <div>by {product.owner.first_name} {product.owner.last_name}</div>
            <div className={"text-md mt-5"}>Brand: <span className="font-semibold">{product.brand}</span></div>
            <div className={"text-md mt-3"}>Status: <span className="font-semibold">{product.status}</span></div>
            <div className={"text-md mt-3"}>Date: <span className="font-semibold">{new Date(product.date*1000).toLocaleDateString()}</span></div>
          </div>
        </div>
        <div className={"text-md font-semibold mb-5 text-center"}>Price<div className="text-lg font-bold">${product.price}</div></div>
        <div className={"text-md font-semibold mb-5 text-center"}>Count<div className="text-lg font-bold">{product.count}</div></div>
      </div>
    </Card>
  )
};

export default OrderItem;
