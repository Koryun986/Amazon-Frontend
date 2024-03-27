"use client"

import {Empty, Space} from "antd";
import {useEffect, useState} from "react";
import {getProductsByIds} from "../../api/requests/product-requests";
import FloatGoHomeButton from "../../shared/FloatGoHomeButtons";
import {useAppSelector} from "../../hooks/store-hooks";
import useCartItems from "../../hooks/cart-item-hooks";
import CartListItem from "./_components/CartListItem";
import type {IProduct} from "../../types/IProduct";

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
  useCartItems();

  const getCartItemProducts = async () => {
    try {
      const products = await getProductsByIds(cartItems.map(cartItem => cartItem.product_id));
      setProducts(products);
    } catch (e) {}
  }

  useEffect(() => {
    if (cartItems.length) {
      getCartItemProducts();
    }
  }, [cartItems]);

  return (
    <div className="container mx-auto pt-10">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold mb-4">Your Cart</div>
        <div className="text-lg">Total: <span className="font-bold">${totalPrice}</span></div>
      </div>
      <FloatGoHomeButton />
      {cartItems.length ? (
        <Space direction="vertical" style={{width: "100%"}}>
          {products.map(product => <CartListItem product={product} key={product.id} cartItem={cartItems.find(cartItem => cartItem.product_id === product.id)} />)}
        </Space>
      ) : <Empty />}
    </div>
  )
}