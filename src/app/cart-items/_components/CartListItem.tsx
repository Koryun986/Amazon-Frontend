"use client"
import Image from "next/image";
import {Button, Card} from "antd";
import {FC} from "react";
import {ApiConstants} from "../../../api/api-constants";
import type {IProduct} from "../../../types/IProduct";
import ProductCartItemButton from "../../../components/ProductCartItemButton";
import type {ICartItem} from "../../../types/ICartItem";

interface CartListItemProps {
  product: IProduct;
  cartItem: ICartItem;
}

const CartListItem: FC<CartListItemProps> = ({product, cartItem}) => {
  const mainImage = product.images.find(image => image.is_main_image)?.image_url;

  return (
    <Card>
      <div className="flex justify-between">
        <div className="flex gap-4 w-[40%]">
          <Image
            src={ApiConstants.PUBLIC_ASSETS_URL+mainImage}
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
            <div className={"text-md font-semibold mb-5"}>Price: ${product.price}</div>
            <ProductCartItemButton id={product.id} />
          </div>
        </div>
        <div className={"text-lg text-center"}>
          <div>Subtotal:</div>
          <div className="font-bold mb-4">${product.price * cartItem.count}</div>
          <Button>Buy Now</Button>
        </div>
      </div>
    </Card>
  )
};

export default CartListItem;