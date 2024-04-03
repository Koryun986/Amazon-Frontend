"use client"
import Image from "next/image";
import {Button, Card, message, Spin} from "antd";
import {FC, useEffect} from "react";
import {ApiConstants} from "../../../../api/api-constants";
import ProductCartItemButton from "../../../../components/ProductCartItemButton";
import {buyProduct} from "../../../../api/requests/product-requests";
import type {IProduct} from "../../../../types/IProduct";
import type {ICartItem} from "../../../../types/ICartItem";
import Link from "next/link";

interface CartListItemProps {
  product: IProduct;
  cartItem: ICartItem;
}

const CartListItem: FC<CartListItemProps> = ({product, cartItem}) => {
  const mainImage = product.main_image.image_url;

  const handleProductOrder = async () => {
    try {
      await buyProduct({id: product.id, times: cartItem.count});
    } catch (e) {
      message.error("Oops something went wrong");
    }
  }



  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      message.success("Product has been successfully ordered");
   }

    if (query.get("canceled")) {
      message.error("Order canceled");
    }
  }, []);

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
          <div className="font-bold mb-4">${product.price * cartItem?.count}</div>
          <Link href={`/buy-product?id=${product.id}&count=${cartItem.count}`}>
            <Button>Buy Now</Button>
          </Link>
        </div>
      </div>
    </Card>
  )
};

export default CartListItem;