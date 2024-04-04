"use client"

import {Button, Empty, Space} from "antd";
import {useEffect, useState} from "react";
import {getProductsByIds} from "../../../api/requests/product-requests";
import FloatGoHomeButton from "../../../shared/FloatGoHomeButtons";
import {useAppSelector} from "../../../hooks/store-hooks";
import useCartItems from "../../../hooks/cart-item-hooks";
import CartListItem from "./_components/CartListItem";
import type {IProduct} from "../../../types/IProduct";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

export default function CartItemsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const cartItems = useAppSelector(state => state.cart_items.cartItems);
  const totalPrice = cartItems.reduce((acc, cur) => {
    const product = products.find(product => product.id === cur.product_id);
    if (!product) {
      return acc;
    }
    return acc + cur.count * product.price;
  },0);
  const searchParams = useSearchParams();
  useCartItems();

  const getCartItemProducts = async () => {
    try {
      const params = new URLSearchParams(searchParams);
      const products = await getProductsByIds(cartItems.map(cartItem => cartItem.product_id), params.toString());
      setProducts(products);
    } catch (e) {}
  }

  useEffect(() => {
    if (cartItems.length) {
      getCartItemProducts();
    }
  }, [cartItems, searchParams]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold mb-4">Your Cart</div>
        <div>
          <div className="text-lg">Total: <span className="font-bold">${totalPrice}</span></div>
          {!!cartItems.length && (
            <Link href={"/buy-product/all-cart"}>
              <Button style={{marginBottom: "20px"}}>Buy All</Button>
            </Link>
          )}
        </div>
      </div>
      {cartItems.length ? (
        <Space direction="vertical" style={{width: "100%"}}>
          {products.map(product => <CartListItem product={product} key={product.id} cartItem={cartItems.find(cartItem => cartItem.product_id === product.id)} />)}
        </Space>
      ) : <Empty />}
    </>
  )
}